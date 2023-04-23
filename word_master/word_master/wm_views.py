from flask  import Blueprint, make_response, jsonify, request
import pandas as pd
import json, random
from datetime import datetime as dt
import numpy as np


wm = Blueprint('wm', __name__, template_folder='templates')

from main import app
wm_db_handle = app.config['WM_DB_OBJ']


@wm.before_request
def before():
    print("Before: "+ request.url)

@wm.route("/get_words", methods=['GET', 'POST'])
def get_words():

    # get all words from SQL
    conn, cursor = wm_db_handle.WM_conn, wm_db_handle.WM_cursor

    try:
        # sql=f"""
        #     insert into wm.words (word) values ('fuck')
        # """
        sql=f"""
            select * from wm.words
        """
        ##cursor.execute(sql)
        df_words = pd.read_sql_query(con=conn, sql=sql)


    except Exception as e:
        print("postgres connection failed: " + str(e))
        return make_response(jsonify({"msg": "SQl failed: " + sql, "error": str(e) }), 500)

    json_words = json.loads(df_words.to_json(orient='records'))
    resp = make_response(jsonify({"msg": "success", "data": json_words}), 200)
    resp.headers["Content-Type"] = "application/json"
    return resp


@wm.route("/insert_a_word/<string:word>", methods=['POST'])
@wm.route("/insert_a_word", methods=['POST'])
def insert_a_word(word=None):
    """

    """

    if word is None:
        word=request.get_json()["word"]

    # get all words from SQL
    conn, cursor = wm_db_handle.WM_conn, wm_db_handle.WM_cursor

    try:
        sql=f"""
            insert into wm.words (word) values ('{word}')
        """

        cursor.execute(sql)

    except Exception as e:
        print("postgres connection failed: " + str(e))
        return make_response(jsonify({"msg": "SQl failed: " + sql, "error": str(e) }), 500)


    resp = make_response(jsonify({"msg": "success"}), 200)
    resp.headers["Content-Type"] = "application/json"
    return resp



@wm.route("/insert_a_word_mongo/<string:word>", methods=['POST'])
@wm.route("/insert_a_word_mongo", methods=['POST'])
def insert_a_word_mongo(wd=None):
    """
    """
    if wd is None:
        wd=request.get_json()

    # get all words from SQL
    wm_conn = wm_db_handle.wm_mongo

    wd['last_update_time'] = dt.now()

    try:
        wm_conn.wm.insert_one( wd)


    except Exception as e:
        print("mongo insert failed: " + str(e))
        return make_response(jsonify({"msg": "mongo insert failed: " + str(wd), "error": str(e) }), 500)


    resp = make_response(jsonify({"msg": "success"}), 200)
    resp.headers["Content-Type"] = "application/json"
    return resp


@wm.route("/get_words_mongo", methods=['GET', 'POST'])
def get_words_mongo():


    wm_conn = wm_db_handle.wm_mongo

    try:
        words=list(wm_conn.wm.find({}, {"_id": 0}))
        df_words=pd.DataFrame.from_records(words)
        df_words['last_update_time'] = pd.to_datetime(df_words['last_update_time'], unit='s', format='%m/%d/%y %H:%M:%S').astype(str)
        print(df_words)
    except Exception as e:
        print("mongo get words failed: " + str(e))
        return make_response(jsonify({"msg": "mongo get words failed: ", "error": str(e) }), 500)

    words_json = json.loads(df_words.to_json(orient='records'))

    resp = make_response(jsonify({"msg": "success", "data": words_json}), 200)
    resp.headers["Content-Type"] = "application/json"
    return resp