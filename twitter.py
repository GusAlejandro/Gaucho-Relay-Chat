import requests
from bs4 import BeautifulSoup

x = True
cur = 0
url = "https://twitter.com/GusAlejandro_/status/70858753116864500"
while x:
    print("testing cur of: " + str(cur) + " on this url: " + str(url))
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    x = soup.find_all("div", {"class": "errorpage-topbar"})
    if len(x) == 0:
        x = False
        print(cur)
    else:
        cur = cur + 1
        if cur<10:
            # single digit
            url = url[:-1]
            url = url + str(cur)
        elif cur<100:
            # double digit
            url = url[:-2]
            url = url + str(cur)
        elif cur>99 and cur<1000:
            # triple digit
            url = url[:-3]
            url = url + str(cur)



