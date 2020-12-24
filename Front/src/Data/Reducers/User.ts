import { UserActionTypes } from "../Actions/UserAuth";
import { LOGIN, LOGOUT } from "../ActionTypes";
import { UserType } from "../Types/UserTypes";

const initalUser: UserType = {
    userId: "",
    fullname: "",
};

const UserReducer = (
    state = initalUser,
    action: { type: string; payload: { user: UserType } }
) => {
    switch (action.type) {
        case LOGIN: {
            return action.payload.user;
            break;
        }
        case LOGOUT: {
            return initalUser;
            break;
        }
        default: {
            return state;
        }
    }
};

export default UserReducer;
