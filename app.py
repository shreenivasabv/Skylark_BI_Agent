from google import genai
from google.genai import types
import pandas as pd
import requests
import streamlit as st

# ------------------------------
# Configuration
# ------------------------------

st.set_page_config(
    page_title="Executive BI Agent",
    page_icon="📊",
    layout="wide"
)

st.title("📊 Executive BI Agent - Skylark Drones")

GEMINI_API_KEY = st.secrets["GEMINI_API_KEY"]
MONDAY_API_KEY = st.secrets["MONDAY_API_KEY"]

DEALS_BOARD_ID = "5030217882"
WORK_ORDERS_BOARD_ID = "5030217957"

HEADERS = {
    "Authorization": MONDAY_API_KEY,
    "API-Version": "2023-10"
}

client = genai.Client(api_key=GEMINI_API_KEY)
GEMINI_MODEL = "gemini-3.5-flash"  # swap to a newer Gemini model if you have access


# ------------------------------
# Fetch Monday Board
# ------------------------------

@st.cache_data(ttl=300)
def fetch_and_clean_board(board_id):

    query = f"""
    query {{
      boards(ids: [{board_id}]) {{
        items_page {{
          items {{
            name
            column_values {{
              column {{
                title
              }}
              text
            }}
          }}
        }}
      }}
    }}
    """

    try:

        response = requests.post(
            "https://api.monday.com/v2",
            json={"query": query},
            headers=HEADERS,
            timeout=30
        )

        response.raise_for_status()

        data = response.json()

        if "errors" in data:
            st.error(data["errors"])
            return pd.DataFrame()

        boards = data.get("data", {}).get("boards", [])

        if not boards:
            st.error("Board not found.")
            return pd.DataFrame()

        items = boards[0]["items_page"]["items"]

        records = []

        for item in items:

            row = {
                "Item": item["name"]
            }

            for col in item["column_values"]:
                row[col["column"]["title"]] = col["text"]

            records.append(row)

        df = pd.DataFrame(records)

        if df.empty:
            return df

        df.fillna("Unknown / Missing", inplace=True)

        for col in df.columns:
            if "date" in col.lower():
                df[col] = pd.to_datetime(df[col], errors="coerce")

        return df

    except Exception as e:
        st.error(f"Monday API Error:\n{e}")
        return pd.DataFrame()


# ------------------------------
# Sidebar
# ------------------------------

st.sidebar.header("Status")

if st.sidebar.button("🔄 Refresh Data"):
    st.cache_data.clear()

with st.spinner("Loading Monday.com data..."):

    df_deals = fetch_and_clean_board(DEALS_BOARD_ID)
    df_work = fetch_and_clean_board(WORK_ORDERS_BOARD_ID)

st.sidebar.success(
    f"Deals: {len(df_deals)} | Work Orders: {len(df_work)}"
)

# ------------------------------
# Show Data
# ------------------------------

with st.expander("Deals Data"):
    st.dataframe(df_deals)

with st.expander("Work Orders Data"):
    st.dataframe(df_work)

# ------------------------------
# User Question
# ------------------------------

question = st.text_input(
    "Ask a business question"
)

# ------------------------------
# Ask Gemini
# ------------------------------

if question:

    system_prompt = f"""
You are an Executive Business Intelligence Assistant.

You help the founders of Skylark Drones.

Deals Data

{df_deals.to_string(index=False)}

Work Orders Data

{df_work.to_string(index=False)}

Instructions

- Answer using ONLY the provided data.
- Be concise.
- Highlight risks.
- Mention missing values if relevant.
- Provide executive recommendations.
"""

    with st.spinner("Generating Insights..."):

        try:

            response = client.models.generate_content(
                model=GEMINI_MODEL,
                contents=question,
                config=types.GenerateContentConfig(
                    system_instruction=system_prompt,
                    temperature=0.2
                )
            )

            st.subheader("💡 Executive Insights")

            st.write(response.text)

        except Exception as e:

            err_str = str(e)

            if "RESOURCE_EXHAUSTED" in err_str or "429" in err_str:
                st.error(
                    """
Gemini returned a rate limit / quota error (429).

This means your Google AI Studio / Gemini API project currently
has no available quota.

Please check:

• Billing
• API key restrictions
• Requests-per-minute / per-day quota
• API key validity
"""
                )
            else:
                st.error(f"Gemini API Error\n\n{err_str}")
