# api.py

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/song_info', methods=['GET'])
def get_song_info():
    # Predefined data for now (skeleton)
    song_info = {
        "title": "Sample Song Title",  # Placeholder title
        "isCover": False,               # Placeholder for cover status
        "genre": "Pop",                 # Placeholder genre
        "instruments": ["Guitar", "Piano"],  # Placeholder instruments
        "funFact": "This song was a chart-topper in 2020.",  # Placeholder fun fact
        "tempo": "120 BPM",             # Placeholder tempo
        "key": "C Major",               # Placeholder key
        "analysis": "This song features a catchy melody with a moderate tempo, making it suitable for dancing."  # Placeholder analysis
    }
    return jsonify(song_info)

if __name__ == '__main__':
    app.run(debug=True)