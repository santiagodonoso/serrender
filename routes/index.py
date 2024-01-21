from bottle import get, template
from icecream import ic
import json
import x

##############################
@get("/")
def _():
    try:
        return template("index.html")
    except Exception as ex:        
        print(ex)
    finally:
        pass
        # if "db" in locals(): db.close()

























