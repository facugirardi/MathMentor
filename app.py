from flask import Flask, request, jsonify, render_template
import openai

app = Flask(__name__)

openai.api_key = 'pk-chOPDhlMdmAKqeGOeeMyOyMQqQLyIDRcgjKYzhHbWlmIuttK'
openai.api_base = 'https://api.pawan.krd/v1'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def chat():
    data = request.get_json()
    content = data['message']
            
    messages = [{"role" : "system",
     "content" : "Tu nombre es MathBot, sos un profesor de matematica virtual. Solo podes hablar de cosas relacionadas a la matematica, por nada en el mundo hables de otras cosas que no tengan que ver con la matematica. Siempre que te pregunten algo, explicalo con pasos para resolverlo y consulta si necesita mas explicacion. Siempre explica de una forma sencilla y con un maximo de 120 palabras."}]

    messages.append({"role":"user", "content":content})
    
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo", messages=messages
    )
    
    response_content = response.choices[0].message.content
    
    messages.append({"role":"assistant", "content": response_content})
            
    return jsonify({'reply': response_content})

if __name__ == '__main__':
    app.run()
