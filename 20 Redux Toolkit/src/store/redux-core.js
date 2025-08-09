import { createStore } from "redux";

const counterInitialState = {
  count: 0,
  toggleShow: true
};

const countReducer = (state = counterInitialState, action) => {
  console.log(action);

  if (action.type === 'INC') {
    return {
      ...state,
      count: state.count + action.add
    }
  }

  if (action.type === 'ADD') {
    return {
      ...state,
      count: state.count + action.payload
    }
  }

  if (action.type === 'DEC') {
    return {
      ...state,
      count: state.count - action.sub
    }
  }

  if (action.type === 'TOGGLE') {
    return {
      ...state,
      toggleShow: !state.toggleShow
    }
  }

  return state;
};

const store = createStore(countReducer);

// export default store;