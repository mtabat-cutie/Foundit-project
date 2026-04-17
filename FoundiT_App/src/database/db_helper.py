import mysql.connector
import json
import os

class DBHelper:
    def __init__(self, config_path="FoundiT_App/config/db_config.json"):
        with open(config_path, "r") as f:
            self.config = json.load(f)
        self.conn = None

    def get_connection(self):
        try:
            if self.conn is None or not self.conn.is_connected():
                self.conn = mysql.connector.connect(
                    host=self.config['host'],
                    user=self.config['user'],
                    password=self.config['password'],
                    database=self.config['database']
                )
            return self.conn
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            return None

    def execute_query(self, query, params=None):
        conn = self.get_connection()
        if conn:
            cursor = conn.cursor(dictionary=True)
            try:
                cursor.execute(query, params or ())
                if query.strip().upper().startswith("SELECT"):
                    result = cursor.fetchall()
                    return result
                else:
                    conn.commit()
                    return cursor.lastrowid
            except mysql.connector.Error as err:
                print(f"Query Error: {err}")
                return None
            finally:
                cursor.close()
        return None

    def initialize_db(self, schema_path="FoundiT_App/src/database/schema.sql"):
        # First connect without database to create it
        try:
            temp_conn = mysql.connector.connect(
                host=self.config['host'],
                user=self.config['user'],
                password=self.config['password']
            )
            cursor = temp_conn.cursor()
            
            with open(schema_path, "r") as f:
                sql_commands = f.read().split(';')
                
            for command in sql_commands:
                if command.strip():
                    cursor.execute(command)
            
            temp_conn.commit()
            cursor.close()
            temp_conn.close()
            return True
        except mysql.connector.Error as err:
            print(f"Initialization Error: {err}")
            return False

# Quick test if run directly
if __name__ == "__main__":
    db = DBHelper()
    if db.initialize_db():
        print("Database initialized successfully!")
    else:
        print("Failed to initialize database.")
