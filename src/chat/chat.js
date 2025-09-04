import { createClientMessage, keywords } from "../utils.js";


const renderChat = (config,messageParserInstance,state,updater,widgetRegistry) =>{
    const chatContainer = document.createElement("div");
    chatContainer.classList.add("vanilla-chatbot-kit-chat-container");

    const innerContainer = document.createElement("div");
    innerContainer.classList.add("vanilla-chatbot-kit-chat-inner-container");
    
    chatContainer.appendChild(innerContainer);

    innerContainer.appendChild(createHeader(state));

    console.log(state)

  


    innerContainer.appendChild(createform(messageParserInstance,updater));

    innerContainer.appendChild(createMessageContainer(config.messages,widgetRegistry,state))


    return chatContainer;



}




const createHeader = (state) =>{
    const header = document.createElement("div");
    header.textContent= `conversation with ${state.botName}`
    header.classList.add("vanilla-chatbot-kit-chat-header");

    return header;
}



const createform = (messageParserInstance,updater,state) =>{
    const container = document.createElement("div");
    container.classList.add("vanilla-chatbot-kit-chat-input-container");

    const form = document.createElement("form");
    form.classList.add("vanilla-chatbot-kit-chat-input-form");

    const input =  document.createElement("input");
    input.placeholder = "Type Your Message Here";
    input.classList.add("vanilla-chatbot-kit-chat-input::placeholder");

    const btn = document.createElement("button");
    btn.classList.add("vanilla-chatbot-kit-chat-btn-send");


  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = input;
    const message = createClientMessage(value);
if (value !== "" && keywords.some(word => value.includes(word))) {
    updater((state) => {
      return { ...state, messages: [...state.messages, message] };
      
    });
    console.log(typeof messageParserInstance);

    messageParserInstance.parse(value);
    
    input.value = "";}
    else{
        console.log("its empty")
    }
  };

  form.onsubmit = handleSubmit;

    const icon = document.createElement("img")
    icon.classList.add("vanilla-chatbot-kit-chat-btn-send-icon")
   icon.src = "../assets/icons/paper-plane.svg";
    icon.alt ="paper plane"

    btn.appendChild(icon);
    form.appendChild(input);
    form.appendChild(btn);

    container.appendChild(form);

    return container;


}


const createMessageContainer = (messages,widgetRegistry,state) =>{

    const messageBox = document.createElement("div");
    messageBox.classList.add("vanilla-chatbot-kit-chat-message-container");

 

    messages.forEach((mes) => {

        const{message,type,widget}  = mes

        let msg;

        if(type== "bot"){
            msg=  messageBox.appendChild(createBotChatMessage(message));

        }else{
             msg =   messageBox.appendChild(createUserChatMessage(message));
        }
        messageBox.appendChild(msg)

            if (widget) {
    const widgetMarkup = widgetRegistry.getWidget(widget, state);
    if(widgetMarkup){
        messageBox.appendChild(widgetMarkup)
    }
  }
        
    });


  

    



 

    return messageBox;

}


const createUserChatMessage = (el) => {
    const container = document.createElement("div")
    container.classList.add("vanilla-chatbot-kit-user-chat-message-container")

    const avatar = document.createElement("div")
    avatar.classList.add("vanilla-chatbot-kit-user-avatar-container")

    const userAvatar = document.createElement('img')
    userAvatar.src = "../assets/icons/user-alt.svg"
    userAvatar.classList.add("vanilla-chatbot-kit-user-avatar-icon") 

    const message = document.createElement("div")
    message.classList.add("vanilla-chatbot-kit-user-chat-message")
    message.textContent = el

    const arrow = document.createElement("div")
    arrow.classList.add("vanilla-chatbot-kit-user-chat-message-arrow")

    message.appendChild(arrow)
    avatar.appendChild(userAvatar)
    container.appendChild(message)
    container.appendChild(avatar)

    return container;
}


const createBotChatMessage = (txt) => {
     const container = document.createElement("div")
    container.classList.add("vanilla-chatbot-kit-chat-bot-message-container")

    const avatar = document.createElement("div")
    avatar.classList.add("vanilla-chatbot-kit-chat-bot-avatar-container")


    const letter = document.createElement("p")
    letter.classList.add("vanilla-chatbot-kit-chat-bot-avatar-letter")
    letter.textContent = "B"

    const message = document.createElement("div")
    message.classList.add("vanilla-chatbot-kit-chat-bot-message")
    message.textContent = txt

    const arrow = document.createElement("div")
    arrow.classList.add("vanilla-chatbot-kit-chat-bot-message-arrow")

    message.appendChild(arrow)
    avatar.appendChild(letter)

    container.appendChild(avatar)
    container.appendChild(message)

        
  
    
    return container;

}


export default renderChat;