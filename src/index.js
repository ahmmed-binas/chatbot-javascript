import renderChat from "./chat/chat.js";
import stateManager from "./state/state.js";
import { createChatBotMessage, createClientMessage } from "./utils.js";

let current;

const renderChatbot = (rootEl, config, messageParser, actionProvider) => {
  const initialState = { messages: [...config.initialMessages] };

  const [state, updater, registerListeners] = stateManager(initialState);

  const actionProviderInstance = new actionProvider(
    createChatBotMessage,
    updater,
    createClientMessage
  );

  const messageParserInstance = new messageParser(actionProviderInstance);


  registerListeners((newState) =>
    render(rootEl, newState, messageParserInstance, config, updater)
  );


  render(rootEl, state, messageParserInstance, config, updater);

   return { messageParserInstance, actionProviderInstance };
};

const render = (rootEl, state, messageParserInstance, config, updater) => {
  if (current) {
    rootEl.removeChild(current);
  }

  const chat = renderChat(state, messageParserInstance, config, updater);
  current = chat;
  rootEl.appendChild(chat);
};

window.vanillaJsChatbot = { renderChatbot, createChatBotMessage };
