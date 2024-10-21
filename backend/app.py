from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS to handle cross-origin requests
import json
from model import probe_model_5l_profit  # Import your financial analysis model

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if a file is included in the request
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    
    # Try to load the JSON data from the uploaded file
    try:
        data = json.load(file)  # Load the JSON data from the file
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON format"}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

    # Check if the expected key "data" is present in the uploaded JSON
    if "data" not in data:
        return jsonify({"error": "Missing 'data' key in JSON"}), 400

    # Call the financial analysis model function
    result = probe_model_5l_profit(data["data"])  # Pass the financial data to your model

    # Return the results as JSON
    return jsonify(result)
