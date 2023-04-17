from flask  import Blueprint, make_response, jsonify, request
import pandas as pd
import json, random
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
    search = request.args.get("search")
    page = request.args.get("page")

    email = request.form.get('email')
    password = request.form.get('password')

    from flask import request
    request.data
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