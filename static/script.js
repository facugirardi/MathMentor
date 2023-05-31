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
 
    chatForm.addEventListener('submit', async (event) => {
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
