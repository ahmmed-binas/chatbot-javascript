import renderChat from "./chat/chat.js"
const rootEl = document.querySelector(".vanilla-chatbot");

const renderChatbot = (rootEl,config,  messageParser, actionProvider) =>{

    
    const chat = renderChat(config);


    rootEl.appendChild(chat);

}

const config = {
    botName:"vanilla-chatbot"
}

renderChatbot(rootEl,config);