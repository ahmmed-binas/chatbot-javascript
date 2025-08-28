

const renderChat = (config) =>{
    const chatContainer = document.createElement("div");
    chatContainer.classList.add("vanilla-chatbot-kit-chat-container");

    const innerContainer = document.createElement("div");
    innerContainer.classList.add("vanilla-chatbot-kit-chat-inner-container");
    
    chatContainer.appendChild(innerContainer);

    innerContainer.appendChild(createHeader(config));

    innerContainer.appendChild(createform());

    return chatContainer;



}




const createHeader = (config) =>{
    const header = document.createElement("div");
    header.textContent= `conversation with ${config.botName}`
    header.classList.add("vanilla-chatbot-kit-chat-header");

    return header;
}


const createform = () =>{
    const container = document.createElement("div");
    container.classList.add("vanilla-chatbot-kit-chat-input-container");

    const form = document.createElement("form");
    form.classList.add("vanilla-chatbot-kit-chat-input-form");

    const input =  document.createElement("input");
    input.placeholder = "Type Your Message Here";
    input.classList.add("vanilla-chatbot-kit-chat-input::placeholder");

    const btn = document.createElement("button");
    btn.classList.add("vanilla-chatbot-kit-chat-btn-send");

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

export default renderChat;