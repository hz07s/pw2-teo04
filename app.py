from flask import Flask, jsonify, render_template, request
import sqlite3

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/buscar', methods=['POST'])
def buscar():
    try:
        tabla = request.form['tabla']
        campo = request.form['campo']
        valor = request.form['valor']

        conn = sqlite3.connect('imdb.db')
        cursor = conn.cursor()

        if tabla == 'Casting':
            cursor.execute("PRAGMA table_info(Casting)")
            columns = cursor.fetchall()
            column_names = [col[1] for col in columns]
            if 'ordinal' in column_names and campo == 'ordinal':
                query = f"SELECT * FROM {tabla} WHERE {campo} = ?"
            else:
                query = f"SELECT * FROM Movie WHERE {campo} >= ?"
        else:
            if campo in ['Year', 'Score', 'Votes']:
                query = f"SELECT * FROM {tabla} WHERE {campo} >= ?"
            else:
                query = f"SELECT * FROM {tabla} WHERE {campo} = ?"
        
        if campo in ['Year', 'Score', 'Votes']:
            valor = int(valor)  # Simulación de error: intentando convertir a entero en lugar de flotante

        cursor.execute(query, (valor,))
        data = cursor.fetchall()

        conn.close()

        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
