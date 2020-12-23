import React, { FunctionComponent, useState } from "react";
import Form from "../Components/Login/Form/Form";
import Hero from "../Components/Login/Hero/Hero";
import Navbar from "../Components/Login/LoginNavbar/Navbar";

const Login: FunctionComponent = () => {
    const [formOpened, setOpenForm] = useState(false);
    const [ModalType, setModalType] = useState("login");

    const OpenForm = () => {
        setOpenForm((formOpened) => !formOpened);
    };

    const OpenLoginForm = () => {
        setModalType("login");
        OpenForm();
    };
    const OpenSignInForm = () => {
        setModalType("signIn");
        OpenForm();
    };

    return (
        <div>
            <Navbar
                openLoginForm={OpenLoginForm}
                openSignInForm={OpenSignInForm}
            ></Navbar>
            <Hero></Hero>
            <Form
                isOpened={formOpened}
                openFunc={OpenForm}
                formType={ModalType}
                setFormType={setModalType}
            ></Form>
        </div>
    );
};

export default Login;
