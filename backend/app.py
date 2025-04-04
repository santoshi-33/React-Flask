from flask import Flask
from flask_cors import CORS
from database import *
from flask import jsonify
from flask import request
api = Flask(__name__)
CORS(api)
init_db()

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body



@api.route('/profile', methods=['POST'])
def create_profile():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    bio = data.get('bio')

    if not all([name, email, bio]):
        return jsonify({'error': 'Missing fields'}), 400

    conn = get_db_connection()
    conn.execute(
        'INSERT INTO profiles (name, email, bio) VALUES (?, ?, ?)',
        (name, email, bio)
    )
    conn.commit()
    conn.close()

    return jsonify({'message': 'Profile saved successfully'}), 201


@api.route('/profiles', methods=['GET'])
def get_profiles():
    conn = get_db_connection()
    profiles = conn.execute('SELECT * FROM profiles').fetchall()
    conn.close()
    return jsonify([dict(row) for row in profiles])

if __name__ == '__main__':
    api.run(debug=True)



