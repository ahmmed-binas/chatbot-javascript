import renderChat from "./chat/chat.js";
import stateManager from "./state/state.js";
import { createChatBotMessage, createClientMessage,getWidgets } from "./utils.js";
import WidgetRegistry from "./widgetRegistry/widgetRegistry.js";

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

  const widgetRegistry  = new WidgetRegistry(updater,actionProviderInstance)
  const widget = getWidgets(config)

  widget.forEach(widget => { widgetRegistry.addWidget(widget)

  registerListeners((newState) =>
    render(rootEl, newState, messageParserInstance, config, updater,widgetRegistry)
  );


    
  });

  render(rootEl, state, messageParserInstance, config, updater,widgetRegistry);

   return { messageParserInstance, actionProviderInstance };
};

const render = (rootEl, state, messageParserInstance, config, updater,widgetRegistry) => {
  if (current) {
    rootEl.removeChild(current);
  }

  const chat = renderChat(state, messageParserInstance, config, updater,widgetRegistry);
  current = chat;
  rootEl.appendChild(chat);
};

window.vanillaJsChatbot = { renderChatbot, createChatBotMessage };
