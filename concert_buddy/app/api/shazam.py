# concert-buddy/src/app/api/shazam.py

from flask import Flask, jsonify
import requests

app = Flask(__name__)

# Replace with your actual Shazam API endpoint and key if needed
SHAZAM_API_URL = "https://shazam.p.rapidapi.com/songs/list"
API_KEY = "YOUR_API_KEY"  # Replace with your actual API key

@app.route('/api/song_info', methods=['GET'])
def get_song_info():
    # Example parameters for the API call
    params = {
        "term": "song title",  # Replace with actual song title or search term
        "locale": "en-US",
        "offset": "0",
        "limit": "5"
    }

    headers = {
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        "X-RapidAPI-Key": API_KEY
    }

    response = requests.get(SHAZAM_API_URL, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        # Extract relevant information from the response
        song_info = {
            "title": data['tracks'][0]['title'],  # Example extraction
            "isCover": False,  # Set based on your logic
            "genre": data['tracks'][0]['genres']['primary'],  # Example extraction
            "instruments": ["Guitar", "Drums"],  # Placeholder, adjust as needed
            "funFact": "This song was a chart-topper in 2020.",  # Placeholder
            "tempo": "120 BPM",  # Placeholder
            "key": "C Major",  # Placeholder
            "analysis": "This song features a catchy melody..."  # Placeholder
        }
        return jsonify(song_info)
    else:
        return jsonify({"error": "Failed to fetch data from Shazam API"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)