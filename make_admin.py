#!/usr/bin/env python3
import sqlite3
import os

def make_admin():
    db_path = "backend/instance/vikasana.db"
    username = "priyanshu5ingh"
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        return
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("UPDATE user_creds SET isAdmin = 1 WHERE username = ?", (username,))
        conn.commit()
        print(f"User '{username}' is now an admin!")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    make_admin() 