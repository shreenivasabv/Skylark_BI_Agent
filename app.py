import os
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

# ------------------------------
# API Keys
# ------------------------------

# Read from Render Environment Variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONDAY_API_KEY = os.getenv("MONDAY_API_KEY")

# Fallback to Streamlit secrets (for local development)
try:
    if not GEMINI_API_KEY:
        GEMINI_API_KEY = st.secrets["GEMINI_API_KEY"]

    if not MONDAY_API_KEY:
        MONDAY_API_KEY = st.secrets["MONDAY_API_KEY"]
except Exception:
    pass

# Stop if keys are missing
if not GEMINI_API_KEY:
    st.error("❌ GEMINI_API_KEY is missing.")
    st.info("Configure GEMINI_API_KEY in Render → Environment.")
    st.stop()

if not MONDAY_API_KEY:
    st.error("❌ MONDAY_API_KEY is missing.")
    st.info("Configure MONDAY_API_KEY in Render → Environment.")
    st.stop()

# ------------------------------
# Constants
# ------------------------------

DEALS_BOARD_ID = "5030217882"
WORK_ORDERS_BOARD_ID = "5030217957"

HEADERS = {
    "Authorization": MONDAY_API_KEY,
    "API-Version": "2023-10"
}

client = genai.Client(api_key=GEMINI_API_KEY)

GEMINI_MODEL = "gemini-2.5-flash"