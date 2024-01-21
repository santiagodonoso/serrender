from bottle import request, response
import sqlite3
import pathlib

##############################
def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}

##############################
def db():
    db = sqlite3.connect(str(pathlib.Path(__file__).parent.resolve())+"/database/basepage.db")
    db.row_factory = dict_factory
    return db

##############################
def dbm():
    dbm = sqlite3.connect(":memory:")
    dbm.execute("CREATE TABLE keys_values(key TEXT, value TEXT, PRIMARY KEY(key)) WITHOUT ROWID")
    dbm.execute("INSERT INTO keys_values VALUES('items', 6)")
    dbm.row_factory = dict_factory
    return dbm

##############################
def disable_cache():
    response.add_header("Cache-Control", "no-cache, no-store, must-revalidate")
    response.add_header("Pragma", "no-cache")
    response.add_header("Expires", 0)    

##############################
def test():
    print("ok")






















