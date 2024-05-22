from flask import Flask, jsonify, render_template, request
import sqlite3

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/buscar', methods=['POST'])
def buscar():
    tabla = request.form['tabla']
    campo = request.form['campo']
    valor = request.form['valor']

    conn = sqlite3.connect('imdb.db')
    cursor = conn.cursor()

    if campo in ['Year', 'Score', 'Votes']:
        valor = float(valor)
        query = f"SELECT * FROM {tabla} WHERE {campo} >= ?"
    else:
        query = f"SELECT * FROM {tabla} WHERE {campo} = ?"

    cursor.execute(query, (valor,))
    data = cursor.fetchall()
    conn.close()

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
