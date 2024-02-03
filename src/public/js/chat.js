const socketClient = io();
let messages = [];
let error = "";
const chat = document.getElementById("chat");

socketClient.emit("getMessages");

socketClient.on("newMessages", (_messages) => {
    messages = [..._messages];
    compileChat();
    document.getElementById("email").value = ''
    document.getElementById("message").value = ''
});

const messageForm = document.getElementById("messageForm");

messageForm.onsubmit = async (e) => {
    e.preventDefault();

    let newMessage = {
        user: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    if (validMessage(newMessage)) {
        socketClient.emit("messageSent", newMessage);
    }
};

function validMessage(_message) {
    return _message.user && _message.message;
}

function compileChat() {
    const chatTemplate = messages
        .map((_message) => `<li>usuario: <b>${_message.user}</b> - mensaje: <b>${_message.message}</b></li>`)
        .join(" ");
    chat.innerHTML = chatTemplate;
}
