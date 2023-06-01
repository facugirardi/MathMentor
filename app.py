from flask import Flask, request, jsonify, render_template
import openai
import shap
import matplotlib.pyplot as plt

app = Flask(__name__)

openai.api_key = 'pk-chOPDhlMdmAKqeGOeeMyOyMQqQLyIDRcgjKYzhHbWlmIuttK'
openai.api_base = 'https://api.pawan.krd/v1'

conv_history = [{"role" : "system",
     "content" : "Tu nombre es MathBot, sos un profesor de matematica virtual. No podes usar markdown. Solo podes hablar de cosas relacionadas a la matematica, por nada en el mundo hables de otras cosas que no tengan que ver con la matematica. Siempre que te pregunten algo, explicalo con pasos ennumerados y en una nueva linea cada uno para resolverlo y consulta si necesita mas explicacion. Siempre explica de una forma sencilla y SIEMPRE con un maximo de 100 palabras, NUNCA digas la longitud de tus respuestas. Si tu mensaje es muy largo, se va a cortar, si eso pasa, pidele al usuario que diga Continuar Mensaje. Vas a responder en el idioma en el que te pregunten, si te hacen la pregunta en un idioma, vos respondes en el mismo, nunca hables solo un idioma. Recorda siempre los mensajes anteriores. Y acordate del nombre del usuario si es que te lo dice. Tenes PROHIBIDO USAR MARKDOWN."}]

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def chat():
    data = request.get_json()
    message = data['message']
    

    conv_history.append({"role":"user", "content":message})
    
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo", messages=conv_history
    )

    response_content = response['choices'][0]['message']['content']

    if not response_content.endswith((".", "?", "!", "…")):
        conv_history.append({"role":"user", "content":'Continua con tu mensaje. Pero con un maximo de 100 palabras mas.'})
        response = openai.ChatCompletion.create(model = "gpt-3.5-turbo", messages=conv_history)
        response_content2 = response['choices'][0]['message']['content']
        f_response = response_content+response_content2
            

        conv_history.append({"role":"assistant", "content": response_content2})
        return jsonify({'reply': f_response})
    
    else:
        conv_history.append({"role":"assistant", "content": response_content})

        return jsonify({'reply': response_content})

if __name__ == '__main__':
    app.run()
