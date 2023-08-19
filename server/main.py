import os
from typing import Annotated
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from utils.google_search import google_search


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def search(query):
    return google_search(query)

@app.get("/")
def get_all_ipos():
    search("Current Live IPO's in India")
    return {"IPOWiseAI": "Works"}




