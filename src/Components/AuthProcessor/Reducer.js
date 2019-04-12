import * as ACTION_TYPE from './Actions/ACTION_TYPE';

export default (state = {}, action) =>
{
    const {type} = action;
    switch (type)
    {
        case ACTION_TYPE.SET_LOGGED_IN:
        {
            const {email} = action;
            return {
                ...state,
                hasLoggedIn: true,
                email: email,
            };
        }
        case ACTION_TYPE.SET_LOGGED_OUT:
        {
            return {
                ...state,
                hasLoggedIn: false,
            };
        }
        default:
        {
            return state;
        }
    }
}