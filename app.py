# 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
# https://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@github.com/santiagodonoso/coderspage.com.git

from bottle import default_app, error, get, post, request, response, static_file, template
import git
from icecream import ic
import json
import uuid


##############################
@post('/6cd4c1c72f644fc581e8f528d042248ea1f71bd3917d4a3daea650f3aa86c6f3')
def git_update():
  try:
    repo = git.Repo('./basepage')
    origin = repo.remotes.origin
    repo.create_head('main', origin.refs.main).set_tracking_branch(origin.refs.main).checkout()
    origin.pull()
    return ""
  except Exception as ex:
     print(ex)

##############################
@get("/favicon.ico")
def _():
    return static_file("favicon.ico", ".")

##############################
@get("/app.css")
def _():
    return static_file("app.css", ".")

##############################
@get("/x.js")
def _():
    return static_file("x.js", "./js")

##############################
@get("/spa.js")
def _():
    return static_file("spa.js", "./js")

##############################
@error(404)
def _(error):
   is_spa = request.query.get("spa", False)
   return template("404", is_spa=is_spa)

##############################
@get("/users")
def _():
    users = [{"name":"Tree"}, {"name":"Four"}]
    html =  """<template class = 'x' 
                        data-xTarget = '#users' 
                        data-xPosition = 'beforeend' 
                        data-xTitle = 'New'
                        data-xSpa = '/test' 
                >"""
    for user in users:
       html += f"<div class='user'>{user['name']}</div>"
    html += "</template>"
    html += "<template class='x' data-xTarget='#test'><div id='test'>WOW</div></template>"      
    html += "<template class='x' data-xTarget='#ok'><div id='ok'>User created</div></template>"      
    return html


##############################
@get("/items/page/<id>")
def _(id):
    # id = uuid.uuid4().hex
    next = int(id) + 2
    next_next = int(id) + 3
    items = [{"name":next}, {"name":next_next}]

    html =  f"""<template class = 'x' 
                        data-xTarget = '#items' 
                        data-xPosition = 'beforeend' 
                        data-xTitle = 'Page {id}'
                        data-xNewUrl = '/page/{id}' 
                >"""
    for item in items:
       html += f"<div class='item x{{id}}'>{item['name']}</div>"
    html += "</template>"

    html += f"""<template class='x' data-xTarget='#btn_more'
                >
                    <button type="submit" id="btn_more" 
                    onclick="x()"
                    data-xMethod = "get" 
                    data-xNewUrl = "/items/page/{next}"       
                    class="flex items-center justify-center w-full h-12 text-slate-100 bg-slate-900"
                    >
                        page {next}
                    </button>
                </template>"""
    return html

##############################
@get("/items/<id>")
def _(id):
   item = template("_item.html", id=id)
   html =   f"""
            <template 
            data-xTarget = "#more_info"
            data-xPosition = "beforeend"
            data-xNewUrl = "/items/{id}"         
            >
                {item}
            </template>
            """
   return html


##############################
import routes.index
# import routes.item


##############################
# HTML
import hi.items

##############################
application = default_app()
















