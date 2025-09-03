const stateManager = (initialState) => {
  // 1. Keep an overview over the state
  // 2. Expose methods for interacting with the state
  // 3. Re render our application when state changes
  let state = initialState;
  const listeners = [];

const updater = (update) => {
  if (typeof update === "function") {
    state = update(state);
  } else {
    state = { ...state, ...update };
  }
  fireListeners();
};


  const registerListener = (listenerFunc) => {
    listeners.push(listenerFunc);
  };

  const fireListeners = () => {
    listeners.forEach((listener) => {
      listener(state);
    });
  };

  return [state, updater, registerListener];
};

export default stateManager;