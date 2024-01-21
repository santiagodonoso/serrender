# 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
# https://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@github.com/santiagodonoso/coderspage.com.git

from bottle import default_app, error, get, post, request, response, static_file, template
import git
from icecream import ic
import json


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
@get("/serrender.js")
def _():
    return static_file("serrender.js", "./js")

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
    html =  """<template class = 'serrender' 
                        data-srTarget = '#users' 
                        data-srPosition = 'beforeend' 
                        data-srTitle = 'New'
                        data-srSpa = '/test' 
                >"""
    for user in users:
       html += f"<div class='user'>{user['name']}</div>"
    html += "</template>"
    html += "<template class='serrender' data-srTarget='#test'><div id='test'>WOW</div></template>"      
    html += "<template class='serrender' data-srTarget='#ok'><div id='ok'>User created</div></template>"      
    return html

##############################
import routes.index
import routes.item


##############################
# HTML
import hi.items

##############################
application = default_app()
















