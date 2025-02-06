from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from setup.timeslots import time_slots

app = Flask(__name__)
vm_ip_addr = "http://128.2.205.21:3000"
CORS(app, resources={r"/*": {"origins": vm_ip_addr}}, supports_credentials=True)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["email_db"]
collection = db["emails"]
time_slots_collection = db["time_slots"]

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"message": "HEALTH OK"}), 200

# Initialize sample time slots
def initialize_time_slots():
    if time_slots_collection.count_documents({}) == 0:
        time_slots_collection.insert_many(time_slots)

initialize_time_slots()

@app.route('/register', methods=['POST', 'OPTIONS'])
def register_email():
    if request.method == 'OPTIONS':  # Handle preflight request
        response = jsonify({'message': 'CORS Preflight Passed'})
        response.headers.add("Access-Control-Allow-Origin", vm_ip_addr)
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response, 200
    
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    if collection.find_one({"email": email}):
        return jsonify({"message": "Email already registered"}), 200

    collection.insert_one({"email": email})
    return jsonify({"message": "Email registered successfully"}), 201

@app.route('/time-slots', methods=['GET'])
def get_time_slots():
    slots = list(time_slots_collection.find({}, {"_id": 0}))
    return jsonify(slots)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
