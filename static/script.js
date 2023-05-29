const chatInput = document.getElementById("chat-input");
const chatOutput = document.getElementById("chat-output");

chatInput.addEventListener("keydown", (event) => {
   if (event.key === "Enter") {
       event.preventDefault();
       if(chatInput.value.length > 0) {
        sendMessage(chatInput.value);
        chatInput.value = ""; 
       }
   }
});

function sendMessage(message) {
   chatOutput.innerHTML += `<p><strong>You:</strong> ${message}</p>`;

   fetch("/", {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
       },
       body: JSON.stringify({ message }),
   })
       .then((response) => response.json())
       .then((data) => {
           chatOutput.innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;
           chatOutput.scrollTop = chatOutput.scrollHeight;


       });
}

