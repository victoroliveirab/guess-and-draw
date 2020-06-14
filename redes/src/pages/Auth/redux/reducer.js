

export const Types = {
    LOGIN:'LOGIN',
    LOGOUT:'LOGOUT'
};

const INITIAL_STATE = {
    logged_in: false,
    user: {},
    activeSessionId:'',
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return login(state,action);
        case Types.LOGOUT:
            return logut(state);
        default:
            return state
    }
}


export const login = (state, {username}) => ({
    ...state,
    user:{
        ...state.user,
        username
    },
    logged_in: true,
});

export const logut = (state) => ({
    ...state,
    user:{},
    logged_in: false,
});

export default reducer;