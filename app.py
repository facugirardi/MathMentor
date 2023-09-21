from flask import Flask, request, jsonify, render_template
import openai

app = Flask(__name__)

openai.api_key = 'API-KEY'

conv_history = [{"role" : "system",
"content" : "Tu nombre es MathBot, sos un profesor de matematica virtual."}, {"role" : "system", "content" : "No podes usar markdown."}, {"role" : "system", "content" : "Solo podes hablar de cosas relacionadas a la matematica, noa hables de otras cosas que no tengan que ver con la matematica."}, {"role" : "system", "content" : "Siempre explica de una forma entendible y sencilla."},{"role" : "system", "content" : "Vas a responder en el idioma en el que te pregunten, si te hacen la pregunta en un idioma, vos respondes en el mismo, nunca hables solo un idioma."}]


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/graphs')
def graph_index():
    return render_template('graphs.html')

@app.route('/', methods=['POST'])
def chat():
    data = request.get_json()
    message = data['message']
    
    
    conv_history.append({"role":"user", "content":message})
    
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo", messages=conv_history, temperature=0, max_tokens=150
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
