from config import *
from dotenv import dotenv_values
from pymongo import MongoClient

import psycopg2
class WM_data_provider:
    def __init__(self):
        print(" getting DB handle !!!")
        self.wm_mongo=self.get_mongo_handle()
        self.WM_conn, self.WM_cursor = self.get_sql_handle()

    def get_mongo_handle(self):
        # connect to mongoDB

        try:
            mongodb_client = MongoClient(MONGO_ATLAS_URI)
            mongo_info = mongodb_client.server_info()
            print("mongo_info: ", mongo_info)
            wmdb_cursor = mongodb_client[DB_NAME]
        except Exception as e:
            print("mongo connection failed: " + str(e))

        return wmdb_cursor

    def get_sql_handle(self):
        conn = psycopg2.connect(
            host="localhost",
            database="WordMaster",
            user="postgres",
            password="@WSX1qaz")

        # Open a cursor to perform database operations
        cursor = conn.cursor()

        return conn, cursor