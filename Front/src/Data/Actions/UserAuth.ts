import { UserInfo } from "os";
import { Action } from "redux";
import { LOGIN, LOGOUT } from "../ActionTypes";
import { UserType } from "../Types/UserTypes";

interface loginUserActionType {
    type: string;
    payload?: {
        user: UserType;
    };
}

interface logoutUserActionType {
    type: string;
}

const loginUser = (user: UserType): loginUserActionType => {
    return {
        type: LOGIN,
        payload: {
            user: user,
        },
    };
};

const logoutUser = (): logoutUserActionType => {
    return {
        type: LOGOUT,
    };
};

export type UserActionTypes = loginUserActionType | logoutUserActionType;

export { loginUser, logoutUser };
