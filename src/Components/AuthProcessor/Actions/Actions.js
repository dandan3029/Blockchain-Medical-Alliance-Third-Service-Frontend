import * as ACTION_TYPE from './ACTION_TYPE';

export function setLoggedInAction(email)
{
    return {
        type: ACTION_TYPE.SET_LOGGED_IN,
        email,
    };
}

export function setLoggedOutAction()
{
    return {
        type: ACTION_TYPE.SET_LOGGED_OUT,
    };
}