from flask import Flask, jsonify, request, render_template
import json

app = Flask(__name__)

# Функция для чтения данных из JSON-файла
def read_data():
    with open('data.json', 'r', encoding='utf-8') as f:
        return json.load(f)

# Функция для записи данных в JSON-файл
def write_data(data):
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/services', methods=['GET'])
def get_services():
    data = read_data()
    return jsonify(data['services'])

@app.route('/api/requests', methods=['POST'])
def add_request():
    new_request = request.json
    if not new_request.get('name') or not new_request.get('email'):
        return jsonify({'error': 'Имя и email обязательны.'}), 400

    data = read_data()
    data['requests'].append(new_request)
    write_data(data)
    return jsonify(new_request), 201

if __name__ == '__main__':
    app.run(debug=True, port=3000)
