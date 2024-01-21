from bottle import get, request, response, template
from icecream import ic
import x

##############################
@get("/items")
def _():
    try:
        page = int(request.query.get("page", 1))
        offset = (page- 1) * 2
        ic(page)
        db = x.db()
        items = db.execute("SELECT * FROM items LIMIT ?, 2", (offset,)).fetchall()
        html = ""
        for item in items:
            html += template("_item.html", item=item)
        next_link = f"items?page={page+1}"
        more_items = True if page < 3 else False
        next = template("_items_nav_link.html", next_link=next_link) if more_items else ""
        # response.status = 400
        return {"info":"server restart", "html":html, "next_link":next}
    except Exception as ex:
        ic()
        ic(ex)
    finally:
        if "db" in locals(): db.close()
