from bottle import get, template
from icecream import ic
import json
import x
import uuid

##############################
@get("/")
def _():
    try:
        id = uuid.uuid4().hex
        return template("index.html", id=id)
    except Exception as ex:        
        print(ex)
    finally:
        pass
        # if "db" in locals(): db.close()

























