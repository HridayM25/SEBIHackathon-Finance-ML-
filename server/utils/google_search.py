from googlesearch import search
from utils.site_scraper import get_site_data, get_pdf

def google_search(query):
    for j in search(query, tld="co.in", num=10, stop=10, pause=2):
        # get_site_data(j)
        print(j)

def search_ipo(ipo_name):
    query = ipo_name + " ipo pdf sebi"
    for j in search(query, tld="co.in", num=10, stop=1, pause=2):
        # print(j)
        get_pdf(j)
