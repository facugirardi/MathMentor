document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-input-container');
    const chatInput = document.getElementById('chat-input');
    const chatOutput = document.getElementById('chat-output');
 
    function addMessageToChat(message, messageType) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');

        const messageElement = document.createElement('div');
        const h1Element = document.createElement('p');
        messageElement.classList.add(messageType);
        h1Element.textContent = message;
        messageElement.appendChild(h1Element);

        messageContainer.appendChild(messageElement);
        chatOutput.appendChild(messageContainer);
        chatOutput.scrollTop = chatOutput.scrollHeight}
    
    function disableBtn(){
        if(chatInput.value != ""){
        const button = document.getElementById('chat-submit');
        const button2 = document.getElementById('chat-submit2');

        button.classList.add("disabled");
        button2.classList.add("disabled");}

    }

    function enableBtn(){
        const button = document.getElementById('chat-submit');
        const button2 = document.getElementById('chat-submit2');

        button.classList.remove("disabled");
        button2.classList.remove("disabled");

    }

    chatForm.addEventListener('submit', async (event) => {
        disableBtn()
        event.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            // Agrega la pregunta del usuario al chat
            addMessageToChat(message, 'question');
            fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            })
                .then((response) => response.json())
                .then((data) => {
                    const botAnswer = data.reply;
                    addMessageToChat(botAnswer, 'answer');
                    enableBtn()
                });
            
            chatInput.value = '';
        }
    });
 });



// SIDE BAR

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }

}

function recMic(){
    const button = document.getElementById('chat-submit2');

    button.classList.add("mic-recording");

}

function notRec(){
    const button = document.getElementById('chat-submit2');

    button.classList.remove("mic-recording");
}


// Record Voice
function startRecording() {    

  var lang = prompt("Ingrese el código del idioma (ejemplo: en-US para inglés, es-ES para español):");
  var recognition = new webkitSpeechRecognition(); // Crear una instancia del objeto de reconocimiento de voz

  recognition.lang = lang; // Establecer el idioma del reconocimiento (en este caso, español)
  recognition.start(); // Iniciar la grabación de voz
  
  recMic()
  disableBtn()

  recognition.onresult = function(event) {
      alert("Microphone Disabled");
      var message = event.results[0][0].transcript; // Obtener el texto convertido de la grabación
      if (message) {
          // Agrega la pregunta del usuario al chat
          addMessageToChat(message, 'question');
     
    
          fetch("/", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ message }),
          })
              .then((response) => response.json())
              .then((data) => {
                  const botAnswer = data.reply;
                  addMessageToChat(botAnswer, 'answer');
       
              });
        notRec()
        enableBtn()
  recognition.onerror = function(event) {
      alert("There was an error. Try Again.");
      console.error('Error al reconocer la voz: ' + event.error);
  }
}

}

function addMessageToChat(message, messageType) {
  const chatOutput = document.getElementById('chat-output');

  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container');

  const messageElement = document.createElement('div');
  const h1Element = document.createElement('p');
  messageElement.classList.add(messageType);
  h1Element.textContent = message;
  messageElement.appendChild(h1Element);

  messageContainer.appendChild(messageElement);
  chatOutput.appendChild(messageContainer);
  chatOutput.scrollTop = chatOutput.scrollHeight
}
}