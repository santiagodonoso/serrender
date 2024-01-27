from bottle import get, template
from icecream import ic
import json
import x


##############################
@get("/")
def _():
    try:
        items = [
            {"id":1, "name":"one"},
            {"id":2, "name":"two"},
            {"id":3, "name":"three"},
            {"id":4, "name":"four"},
        ]
        return template("index.html", items=items)
    except Exception as ex:        
        print(ex)
    finally:
        pass
        # if "db" in locals(): db.close()

























