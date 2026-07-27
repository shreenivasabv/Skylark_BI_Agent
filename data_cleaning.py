"""
Data resilience layer for the Skylark Drones BI Agent.

Handles:
- Type inference per column (numeric / date / text)
- Normalizing currency symbols, commas, and text casing
- Filling missing values with an explicit sentinel
- Dropping exact duplicate rows
- Producing a per-column data quality report the app can show to the user
"""

import re
import pandas as pd

CURRENCY_RE = re.compile(r"[₹$,]")


def _looks_numeric(series: pd.Series) -> bool:
    """Heuristic: does this column mostly contain numeric-looking text?"""
    sample = series.dropna().astype(str).head(20)
    if sample.empty:
        return False
    stripped = sample.str.replace(CURRENCY_RE, "", regex=True).str.strip()
    numeric_count = pd.to_numeric(stripped, errors="coerce").notna().sum()
    return numeric_count >= max(1, int(len(sample) * 0.7))


def clean_dataframe(df: pd.DataFrame):
    """
    Normalize a raw Monday.com board dataframe.

    Returns:
        (clean_df, quality_report)

        clean_df: the cleaned dataframe (dates parsed, numbers converted,
                  text trimmed/case-normalized, duplicates dropped, missing
                  values filled with "Unknown / Missing")

        quality_report: dict of {column_name: {"type", "missing_count",
                  "missing_pct"}}, plus a "_meta" key with total_rows and
                  duplicate_rows_removed
    """
    if df.empty:
        return df, {}

    df = df.copy()
    quality_report = {}
    total_rows = len(df)

    for col in df.columns:
        raw = df[col]

        # missing value accounting BEFORE normalization
        blank_mask = raw.astype(str).str.strip().isin(["", "nan", "None", "NaN"]) | raw.isna()
        missing_count = int(blank_mask.sum())

        if col.lower() != "item" and "date" in col.lower():
            df[col] = pd.to_datetime(raw, errors="coerce", dayfirst=False)
            still_missing = int(df[col].isna().sum())
            quality_report[col] = {
                "type": "date",
                "missing_count": still_missing,
                "missing_pct": round(100 * still_missing / total_rows, 1)
            }

        elif col.lower() != "item" and _looks_numeric(raw):
            cleaned = raw.astype(str).str.replace(CURRENCY_RE, "", regex=True).str.strip()
            df[col] = pd.to_numeric(cleaned, errors="coerce")
            still_missing = int(df[col].isna().sum())
            quality_report[col] = {
                "type": "numeric",
                "missing_count": still_missing,
                "missing_pct": round(100 * still_missing / total_rows, 1)
            }

        else:
            # text/categorical: trim whitespace, collapse casing variants
            cleaned = raw.astype(str).str.strip()
            cleaned = cleaned.where(~blank_mask, other=pd.NA)
            if cleaned.dropna().astype(str).str.len().median() <= 20:
                cleaned = cleaned.apply(
                    lambda v: v.strip().title() if isinstance(v, str) else v
                )
            df[col] = cleaned
            quality_report[col] = {
                "type": "text",
                "missing_count": missing_count,
                "missing_pct": round(100 * missing_count / total_rows, 1)
            }

    df = df.fillna("Unknown / Missing")

    dupes = int(df.duplicated().sum())
    if dupes:
        df = df.drop_duplicates()

    quality_report["_meta"] = {
        "total_rows": total_rows,
        "duplicate_rows_removed": dupes
    }

    return df, quality_report


def quality_flags(report: dict, threshold_pct: float = 15.0):
    """Return human-readable caveats for columns with significant missing data."""
    flags = []
    for col, stats in report.items():
        if col == "_meta":
            continue
        if stats["missing_pct"] >= threshold_pct:
            flags.append(
                f"**{col}**: {stats['missing_pct']}% missing ({stats['missing_count']} rows)"
            )
    if report.get("_meta", {}).get("duplicate_rows_removed"):
        flags.append(
            f"Removed {report['_meta']['duplicate_rows_removed']} exact duplicate row(s)."
        )
    return flags
