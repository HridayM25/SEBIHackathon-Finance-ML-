import os
from datetime import datetime, timedelta
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from utils.google_search import google_search
from utils.site_scraper import fetch_all_ipo
from utils.analyze_selected_ipo import analyze_selected_ipo

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

list_of_ipo = {}
last_fetch_time = None
cache_duration = timedelta(hours=24)

def search(query):
    return google_search(query)

def fetch_ipo_data():
    global last_fetch_time, list_of_ipo
    
    current_time = datetime.now()
    
    # Check if data is cached and cache duration has not expired
    if list_of_ipo and last_fetch_time and (current_time - last_fetch_time) <= cache_duration:
        return
    
    url = "https://ipowatch.in/upcoming-ipo-calendar-ipo-list/"
    list_of_ipo = fetch_all_ipo(url)  # fetches all IPOs from the site
    last_fetch_time = current_time

@app.get("/getIPO")
def get_ipo():
    fetch_ipo_data()
    return JSONResponse(content=list_of_ipo)

@app.post("/processIPO")
async def process_ipo(data: dict):
    fetch_ipo_data()
    index = data['IPOIndex']
    keys_list = list(list_of_ipo.keys())  # Get a list of keys
    values_list = list(list_of_ipo.values())  # Get a list of values
    items_list = list(list_of_ipo.items())  # Get a list of key-value pairs
    analyze_selected_ipo(keys_list[index], values_list[index])
    # print(data)
    # print(index)
