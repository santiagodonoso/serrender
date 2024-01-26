from bottle import get, template
from icecream import ic
import json
import x


##############################
@get("/about-us")
def _():
    try:
        return template("about-us.html", active = "about-us")
    except Exception as ex:        
        ic(ex)
    finally:
        pass
        # if "db" in locals(): db.close()

























