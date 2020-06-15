export const Types = {
  UPDATE_ANSWERS: "UPDATE_ANSWERS",
  UPDATE_CHAT: "UPDATE_CHAT",
  UPDATE_ANSWER: "UPDATE_ANSWER",
  UPDATE_PLAYERS: "UPDATE_PLAYERS",
  
  //MOCKING:
  ADD_ANSWER: "ADD_ANSWER",
  ADD_MESSAGE: "ADD_MESSAGE",
};

const INITIAL_STATE = {
  answers: [],
  chat: [],
  answer: "",
  players: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.UPDATE_ANSWERS:
      return updateAnswers(state, action);
    case Types.UPDATE_CHAT:
      return updateChat(state, action);
    case Types.UPDATE_ANSWER:
      return updateAnswer(state, action);
    case Types.UPDATE_PLAYERS:
      return updatePlayers(state, action);
    case Types.ADD_MESSAGE:
    
    case Types.ADD_ANSWER:

    default:
      return state;
  }
};

export default reducer;

export const updateAnswers = (state, { answers }) => ({
  ...state,
  answers,
});

export const updateChat = (state, { chat }) => ({
  ...state,
  chat,
});

export const updateAnswer = (state, { answer }) => ({
  ...state,
  answer,
});

export const updatePlayers = (state, { players }) => ({
  ...state,
  players,
});

export const addMessage = (state, {message}) => ({
  ...state,
  chat:[
    ...state.chat,
    message
  ]
});

export const addAnswer = (state, {answer}) => ({
  ...state,
  answers:[
    ...state.answers,
    answer
  ],
})
