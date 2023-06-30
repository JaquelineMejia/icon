from flask import Flask, render_template, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.debug = True


@app.route('/guardar', methods=['POST'])
def guardar():
    print("REQ----")
    data = request.get_json()
    print(data)
    clasificacion = data['nombre']
    email = data['email']
    opinion = data['opinion']
    
    # Aquí puedes realizar acciones adicionales, como guardar los datos en una base de datos
    
    return 'Tu mensaje fue enviado con éxito'

if __name__ == '__main__':
    app.run()