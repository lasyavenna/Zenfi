# --- Imports ---
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import base64
import uuid
from datetime import datetime

# --- ⚠️ Final Credentials Check (CRITICAL) ---
# This is your last chance to make sure these are perfect.
VISA_API_KEY = "FRUBU74VSHGADKV3IMIK21-bWGYj-RYLyET1laDZ1iZFhHdYs"
# THIS MUST BE THE DECRYPTED SECRET YOU GOT FROM THE `openssl` COMMAND.
VISA_SHARED_SECRET = "YOUR_DECRYPTED_SHARED_SECRET_HERE" 
CERT_FILE_PATH = "/Users/sukirtibahlsoni/Downloads/cert.pem"
KEY_FILE_PATH = "/Users/sukirtibahlsoni/Downloads/privateKey-2a79a250-fc31-443a-947f-b04829feb59e.pem"
# --- End Credentials ---

PAV_SANDBOX_URL = "https://sandbox.api.visa.com/pav/v1/cardValidation"

def get_auth_header():
    secret = str(VISA_SHARED_SECRET) if VISA_SHARED_SECRET else ""
    auth_string = f"{VISA_API_KEY}:{secret}"
    encoded_auth = base64.b64encode(auth_string.encode('utf-8')).decode('utf-8')
    return f"Basic {encoded_auth}"

def call_visa_pav_api(card_number, expiry_month, expiry_year):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': get_auth_header(),
        'x-correlation-id': f'{uuid.uuid4().hex}_{datetime.now().strftime("%Y%m%d%H%M%S")}'
    }
    payload = {
        "primaryAccountNumber": card_number,
        "cardExpiryDate": f"{expiry_month}{expiry_year[-2:]}",
    }

    print("--- Sending Direct Request to Visa Sandbox ---")
    print("URL:", PAV_SANDBOX_URL)
    print("---------------------------------------")

    try:
        response = requests.post(
            PAV_SANDBOX_URL,
            headers=headers,
            data=json.dumps(payload),
            cert=(CERT_FILE_PATH, KEY_FILE_PATH)
        )
        response.raise_for_status()
        visa_response_data = response.json()
        print("--- ✅ SUCCESS: Visa Response ---")
        print(json.dumps(visa_response_data, indent=2))
        return {"success": True, "data": visa_response_data}

    except requests.exceptions.SSLError as ssl_err:
        print(f"\n🚨 SSL Error: {ssl_err}")
        print("   Hint: Your .pem file paths are likely wrong, or the certificates are invalid.")
        return {"success": False, "message": "SSL connection error."}
    except requests.exceptions.HTTPError as http_err:
        error_details = http_err.response.text
        try: error_details = http_err.response.json()
        except json.JSONDecodeError: pass
        print(f"\n🚨 HTTP Error: {http_err.response.status_code} {http_err.response.reason}")
        print(f"   Visa Says: {error_details}")
        if http_err.response.status_code == 401:
            print("   Hint: Authentication failed. Your DECRYPTED Shared Secret is almost certainly wrong.")
        return {"success": False, "message": f"Visa API Error: {http_err.response.status_code}"}
    except FileNotFoundError:
        print(f"\n🚨 File Not Found Error: Could not find your cert/key files.")
        print(f"   Check Cert Path: {CERT_FILE_PATH}")
        print(f"   Check Key Path: {KEY_FILE_PATH}")
        return {"success": False, "message": "Certificate or key file not found."}
    except Exception as e:
        print(f"\n🚨 An Unexpected Error Occurred: {e}")
        return {"success": False, "message": "An unexpected error occurred."}

# --- This block runs ONLY when you execute `python3 visa.py` directly ---
if __name__ == '__main__':
    # Set this to True to run the direct test, False to run the Flask server
    RUN_DIRECT_TEST = True 

    if RUN_DIRECT_TEST:
        print("--- Running Direct Visa API Test ---")
        test_card_number = "4000000000000001" # Visa's official sandbox test card
        test_expiry_month = "12"
        test_expiry_year = "2025"
        call_visa_pav_api(test_card_number, test_expiry_month, test_expiry_year)
    else:
        # --- Flask Server Logic (for later) ---
        app = Flask(__name__)
        CORS(app)
        
        @app.route('/api/validate-card', methods=['POST'])
        def handle_validate_card():
            data = request.json
            card_number = data.get("cardNumber")
            expiry = data.get("cardExpiry")
            if not all([card_number, expiry, len(expiry) == 5, expiry[2] == '/']):
                return jsonify({"success": False, "message": "Invalid card data from frontend."}), 400
            
            expiry_month = expiry[:2]
            expiry_year = f"20{expiry[3:]}"
            
            result = call_visa_pav_api(card_number, expiry_month, expiry_year)
            
            if result["success"]:
                return jsonify({"success": True, "message": "Card validation complete.", "details": result.get("data")})
            else:
                return jsonify({"success": False, "message": result.get("message", "Validation failed.")}), 500
        
        print("--- Starting Flask Web Server ---")
        app.run(debug=True, port=5001)