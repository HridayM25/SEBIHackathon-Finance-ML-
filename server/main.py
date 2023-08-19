import os
from typing import Annotated
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import FileResponse
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from utils.google_search import google_search
from utils.site_scraper import fetch_all_ipo

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

list_of_ipo = {}

def search(query):
    return google_search(query)

@app.get("/")
def home():
    # search("Am i funny?")
    return {"IPOWiseAI": "Works"}


@app.get("/getIPO")
def get_ipo():
    url = "https://ipowatch.in/upcoming-ipo-calendar-ipo-list/"
    list_of_ipo = fetch_all_ipo(url) # fetches all IPOs from the site
    print(list_of_ipo)
    return JSONResponse(content=list_of_ipo)

