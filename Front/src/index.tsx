import React, { FunctionComponent, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "./Components/Button/Button";
import Login from "./Pages/Login";
import {
    Provider,
    RootStateOrAny,
    useDispatch,
    useSelector,
} from "react-redux";
import store from "./Data";
import { UserType } from "./Data/Types/UserTypes";
import axios from "axios";
import { loginUser, logoutUser } from "./Data/Actions/UserAuth";

const App: FunctionComponent = () => {
    const user: UserType = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token !== null) {
            axios
                .get("/Users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    dispatch(loginUser(res.data));
                });
        } else {
            console.log("oops");
        }
    }, []);

    return (
        <div className="app">
            {user.userId == "" ? (
                <Login />
            ) : (
                <div>
                    <h1>Hello {user.fullname}</h1>
                    <Button
                        onClick={() => {
                            window.localStorage.removeItem("token");
                            dispatch(logoutUser());
                        }}
                    >
                        Logout
                    </Button>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);
