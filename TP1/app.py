from flask import Flask, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)

mongo_host = os.environ.get("MONGO_HOST", "localhost")
mongo_port = int(os.environ.get("MONGO_PORT", 27017))
mongo_db = os.environ.get("MONGO_DB", "testdb")

# Connexion à MongoDB
client = MongoClient(host=mongo_host, port=mongo_port)
db = client[mongo_db]

@app.route("/")
def hello_world():
    collections = db.list_collection_names()
    return jsonify({"message": "Hello World", "collections": collections})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)