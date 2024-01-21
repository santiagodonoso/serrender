from bottle import get, request, response, template
from icecream import ic

##############################
@get("/item/<id>")
def _(id):
    ic()
    is_spa = request.query.get("spa", False)
    ic(is_spa)
    ic(id)
    if id == "3":
        response.status = 404
        return template("404", id=id, is_spa=True)
    return template("item", id=id, is_spa=is_spa)




















