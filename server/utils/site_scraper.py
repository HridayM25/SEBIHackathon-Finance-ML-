import os
from bs4 import BeautifulSoup
import requests

def get_site_data(url):
    print("This is URL: " + url)


# id = menu-1-39ad960
def fetch_all_ipo(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    list = soup.find(id="menu-1-39ad960")
    list_of_ipo = list.find_all("li")
    only_ipo = {}
    for ipo in list_of_ipo:
        only_ipo[ipo.text] = ipo.find("a")["href"]
    return only_ipo

def get_pdf(url):
    print("This is URL where i will get the pdf: " + url)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    list = soup.find(class_="cover")
    iframe = list.find("iframe")
    print(iframe["src"])
    pdf_url = iframe["src"]
    file_start = pdf_url.index("file=") + len("file=")
    ipo_file_url = pdf_url[file_start:]
    print(ipo_file_url)
    download_pdf(ipo_file_url)

def download_pdf(url):
    save_folder = "ipo_docs"
    if not os.path.exists(save_folder):
        os.makedirs(save_folder)
    response = requests.get(url)
    if response.status_code == 200:
        save_path = os.path.join(save_folder, 'ipo.pdf')
        with open(save_path, "wb") as f:
            f.write(response.content)
        print(f"File saved at {save_path}")
    else:
        print("Failed to download the file.")

    
    