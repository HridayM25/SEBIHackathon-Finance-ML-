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