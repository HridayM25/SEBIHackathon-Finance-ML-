from utils.google_search import google_search, search_ipo

def analyze_selected_ipo(ipo_name, ipo_link):
    print("Analyzing IPO: ", ipo_name)
    print("Link: ", ipo_link) 
    search_ipo(ipo_name)
