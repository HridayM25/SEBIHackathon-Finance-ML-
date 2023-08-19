from googlesearch import search
from utils.site_scraper import get_site_data

def google_search(query):
    for j in search(query, tld="co.in", num=10, stop=10, pause=2):
        # get_site_data(j)
        print(j)

