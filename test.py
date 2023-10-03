import requests

# This is a fake API key for demonstration purposes. Never hard-code real API keys in your code!
API_KEY = "add000c0f319b7f9d4f86c249ecabc30"

# Hypothetical API endpoint
api_url = "https://api.example.com/data"

# Headers with API key
headers = {
    "Authorization": f"Bearer {API_KEY}"
}

# Make a GET request to the API endpoint
response = requests.get(api_url, headers=headers)

# Check the status of the response
if response.status_code == 200:
    print("Success:", response.json())
else:
    print("Failed:", response.status_code)

