from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/buscar', methods=['POST'])
def buscar():
    tabla = request.form['tabla']
    campo = request.form['campo']
    valor = request.form['valor']
    return jsonify({'tabla': tabla, 'campo': campo, 'valor': valor})

if __name__ == '__main__':
    app.run(debug=True)
