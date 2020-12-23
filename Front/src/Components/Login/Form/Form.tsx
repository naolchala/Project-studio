import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import styled, { StyledComponent } from "styled-components";
import { CSSTransition } from "react-transition-group";
import { MdClose } from "react-icons/md";
import { GlobalTheme } from "../../Theme/Theme";
import { Button } from "../../Button/Button";

interface loginFormProps {
    isOpened: boolean;
    openFunc: () => void;

    formType: string;
    setFormType: Dispatch<SetStateAction<string>>;
}

const Form: FunctionComponent<loginFormProps> = ({
    isOpened,
    openFunc,
    formType,
    setFormType,
}: loginFormProps) => {
    return (
        <CSSTransition in={isOpened} timeout={100} classNames="form--animation">
            <FormContainer>
                <Header>
                    <CloseModal onClick={openFunc}>
                        <MdClose></MdClose>
                    </CloseModal>
                </Header>
                <SwitchContainer>
                    <SwitchButton
                        onClick={() => setFormType("login")}
                        active={formType == "login"}
                    >
                        Login
                    </SwitchButton>
                    <SwitchButton
                        onClick={() => setFormType("signIn")}
                        active={formType == "signIn"}
                    >
                        Sign Up
                    </SwitchButton>
                </SwitchContainer>

                <CSSTransition
                    timeout={300}
                    in={formType == "login"}
                    unmountOnExit
                    mountOnEnter
                >
                    <InputContainerForm>
                        <Input type="text" placeholder="Email"></Input>
                        <Input type="password" placeholder="Password"></Input>
                        <SubmitButton type="submit">Login</SubmitButton>
                    </InputContainerForm>
                </CSSTransition>
                <CSSTransition
                    in={formType == "signIn"}
                    timeout={300}
                    unmountOnExit
                    mountOnEnter
                >
                    <InputContainerForm>
                        <Input type="text" placeholder="Fullname"></Input>
                        <Input type="text" placeholder="Email"></Input>
                        <Input type="password" placeholder="Password"></Input>
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                        ></Input>
                        <SubmitButton type="submit">
                            Create Account
                        </SubmitButton>
                    </InputContainerForm>
                </CSSTransition>
            </FormContainer>
        </CSSTransition>
    );
};

const FormContainer: StyledComponent<"div", any, {}, never> = styled.div`
    overflow: auto;
    position: fixed;
    background: white;
    top: -110%;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 2px 6px -1px #000;

    display: flex;
    flex-direction: column;
    align-items: center;

    transition: all 500ms ease-in-out;

    &.form--animation-enter-done {
        top: 0;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    padding: 16px;
`;

const CloseModal = styled.button`
    border: none;
    background: transparent;
    outline: none;

    font-size: 30px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    transition: background 200ms;

    &:hover {
        background: #00002222;
    }
`;

const SwitchContainer = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

interface SwitchButtonsProps {
    active?: boolean;
}

const SwitchButton = styled.button<SwitchButtonsProps>`
    border: 2px solid ${GlobalTheme.primaryColor};
    background: ${(props) =>
        props.active ? GlobalTheme.primaryColor : "transparent"};
    padding: 8px 50px;
    border-radius: 100px;
    margin: 0 15px;
    font-size: 18px;
    outline: none;
    color: ${(props) => (props.active ? "white" : GlobalTheme.primaryColor)};
    transition: all 300ms;

    @media screen and (max-width: 400px) {
        padding: 8px ${(props) => (!props.active ? "40px" : "15px")};
        font-size: 12px;
    }
`;

const InputContainerForm = styled.form`
    margin-top: 50px;
    text-align: center;
    transform: scale(0);
    transform-origin: center;
    opacity: 0;
    transition: all 300ms;
    position: absolute;
    &.enter {
        transform: scale(0);
        opacity: 0;
    }
    &.enter-done {
        opacity: 1;
        position: relative;
        transform: scale(1);
    }

    @media screen and (max-width: 400px) {
        & {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
`;

const Input = styled.input`
    width: 100%;
    display: block;
    border-radius: 4px;
    padding: 10px 15px;
    border: none;
    outline: none;
    margin: 20px 0;
    color: ${GlobalTheme.primaryColor};
    font-size: 16px;
    background: ${GlobalTheme.primaryShades.Shade3};
    transition: background 200ms ease-in-out;
    &:focus {
        background: ${GlobalTheme.primaryShades.Shade2};
    }

    @media screen and (max-width: 400px) {
        & {
            margin: 10px 10px;
            width: 90%;
        }
    }
`;

const SubmitButton = styled.button`
    margin-top: 40px;
    border: none;
    outline: none;
    font-size: 16px;
    background: ${GlobalTheme.secondaryColor};
    color: #fff;
    padding: 8px 25px;
    transition: all 0.2s;
    border-radius: 6px;
`;

export default Form;
