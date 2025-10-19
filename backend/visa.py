# --- Imports ---
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import base64 # Needed for basic auth
import uuid # May be needed for correlation IDs
from datetime import datetime
# Assuming your StockSandbox class is in a file named sandbox.py
# from sandbox import StockSandbox 

app = Flask(__name__)
CORS(app) # Enable CORS for frontend requests

# --- ⚠️ Sensitive Credentials (LOCAL USE ONLY) ---
VISA_API_KEY = "FRUBU74VSHGADKV3IMIK21-bWGYj-RYLyET1laDZ1iZFhHdYs" # FAKE KEY
# SHARED SECRET MUST BE DECRYPTED first if you obtained it encrypted
VISA_SHARED_SECRET = "hUVXQd4UYIWa6VYQfV8poO75MvWzyovGzo6KF35hfSlSejaKEL41WIn/1KWertKyJPazvkTNDIRkcep8/qApNA0zY+SBAXc1AxNkj1lx2z2kq/gyMtUJVm33W8Z0eTNfsN2LVmznAXt4lp2WUrVnAtECXUL3vWfXU5jHUvgf0a8rU9ifByNe9wZwpqDH1LhiOSLa1sYYUhrKa2onvzmWxhnQOgy0B25Bk/8UHwx3fjNZbGUYgF/NV1+HfwZuXOIYBEr/W87RceeJbnfBh0hfapKZ85FIFyaigv6UD0xU/5qNt6Cucr5X6Pq167Y5P70mKscy2zWdooj+HABIgcKf2g==" # FAKE SECRET - REPLACE
CERT_FILE_PATH = "/Users/sukirtibahlsoni/Downloads/cert.pem" # Use your actual path
KEY_FILE_PATH = "/Users/sukirtibahlsoni/Downloads/privateKey-2a79a250-fc31-443a-947f-b04829feb59e.pem" # Use your actual path
# --- End Credentials ---

# Visa PAV Sandbox URL
PAV_SANDBOX_URL = "https://sandbox.api.visa.com/pav/v1/cardValidation"

# --- Authentication Helper (Using Basic Auth as in your snippet) ---
# NOTE: Check Visa PAV docs if X-Pay Token is needed instead.
def get_auth_header():
    auth_string = f"{VISA_API_KEY}:{VISA_SHARED_SECRET}"
    encoded_auth = base64.b64encode(auth_string.encode()).decode()
    return f"Basic {encoded_auth}"

# --- Function to Call Visa API ---
# This function now takes card data as arguments
def call_visa_pav_api(card_number, expiry_month, expiry_year):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': get_auth_header(),
        'x-correlation-id': f'{uuid.uuid4().hex}_{datetime.now().strftime("%Y%m%d%H%M%S")}' # Example Correlation ID
    }

    payload = {
        "primaryAccountNumber": card_number,
        "cardExpiryDate": f"{expiry_month}{expiry_year[-2:]}", # Format MMYY
        # Add other fields like name, address if required by PAV for specific checks
    }

    print("--- Sending Request to Visa Sandbox ---")
    print("URL:", PAV_SANDBOX_URL)
    # Avoid printing full Authorization header in real logs
    print("Headers: Authorization=Basic [REDACTED], Content-Type=application/json, ...")
    print("Payload:", payload)
    print("Using Cert:", CERT_FILE_PATH)
    print("Using Key:", KEY_FILE_PATH)
    print("---------------------------------------")

    try:
        response = requests.post(
            PAV_SANDBOX_URL,
            headers=headers,
            data=json.dumps(payload),
            cert=(CERT_FILE_PATH, KEY_FILE_PATH) # Specify mTLS certs
        )
        response.raise_for_status() # Raise error for bad responses (4xx or 5xx)
        visa_response_data = response.json()
        print("--- Visa Response ---")
        print(json.dumps(visa_response_data, indent=2))
        print("---------------------")
        return {"success": True, "data": visa_response_data}

    # (Keep all the detailed error handling from the previous version)
    except requests.exceptions.SSLError as ssl_err:
        print(f"\n🚨 SSL Error: {ssl_err}")
        return {"success": False, "message": "SSL connection error. Check cert/key paths and validity."}
    except requests.exceptions.HTTPError as http_err:
        error_details = http_err.response.text
        try:
            error_details = http_err.response.json()
        except json.JSONDecodeError:
            pass # Keep as text if not JSON
        print(f"\n🚨 HTTP Error: {http_err.response.status_code} {http_err.response.reason}")
        print(f"   Visa Error Response: {error_details}")
        return {"success": False, "message": f"Visa API Error: {http_err.response.status_code}"}
    except requests.exceptions.RequestException as e:
        print(f"\n🚨 General Request Error: {e}")
        return {"success": False, "message": "Failed to connect to Visa API."}
    except FileNotFoundError as fnf_err:
        print(f"\n🚨 File Not Found Error: {fnf_err}")
        print(f"   Check Cert Path: {CERT_FILE_PATH}")
        print(f"   Check Key Path: {KEY_FILE_PATH}")
        return {"success": False, "message": "Certificate or key file not found."}


# --- Flask API Endpoint ---
@app.route('/api/validate-card', methods=['POST'])
def handle_validate_card():
    # Get card data sent from the frontend
    data = request.json
    card_number = data.get("cardNumber")
    expiry = data.get("cardExpiry") # Expected format MM/YY

    # Basic Input Validation
    if not card_number or not expiry or len(expiry) != 5 or expiry[2] != '/':
        print("Validation Error: Invalid input format from frontend.")
        return jsonify({"success": False, "message": "Invalid card data format received."}), 400

    expiry_month = expiry[:2]
    # Ensure year is handled correctly (e.g., '25' -> '2025')
    expiry_year = f"20{expiry[3:]}" if len(expiry[3:]) == 2 else expiry[3:]

    print(f"Received validation request for card ending in {card_number[-4:]}")

    # Call the function that talks to Visa
    result = call_visa_pav_api(card_number, expiry_month, expiry_year)

    # Send Visa's response (or your error message) back to the frontend
    if result["success"]:
        # You might want to customize the success message or filter data
        return jsonify({"success": True, "message": "Card validation check complete.", "details": result.get("data")})
    else:
        # Return a generic error message to frontend, keep details in server logs
        return jsonify({"success": False, "message": result.get("message", "Card validation failed.")}), 500


# --- Placeholder for other API routes (like stock sandbox) ---
# @app.route('/api/buy', methods=['POST'])
# def api_buy():
#     # ... your stock buying logic ...
#     pass

# @app.route('/api/stock-info', methods=['GET'])
# def api_get_stock_info():
#     # ... your yfinance logic ...
#     pass


if __name__ == '__main__':
    # Run the Flask server
    print("Starting Flask server...")
    # Make sure debug=True is ONLY for development/hackathon
    # Use port 5001 or another available port
    app.run(debug=True, port=5001)