import React from "react";
import styled from "styled-components";
import { GlobalTheme } from "../../Theme/Theme";

interface NavbarProps {
    openLoginForm: () => void;
    openSignInForm: () => void;
}

const Navbar = ({ openLoginForm, openSignInForm }: NavbarProps) => {
    return (
        <Nav>
            <Logo>Project Studio</Logo>
            <NavItems>
                <NavLink onClick={openSignInForm}>Sign Up</NavLink>
                <NavLink onClick={openLoginForm} filled>
                    Sign In
                </NavLink>
            </NavItems>
        </Nav>
    );
};

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
`;

const Logo = styled.span`
    color: ${GlobalTheme.secondaryColor};
    font-size: 25px;
    font-weight: bold;
`;

const NavItems = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;
interface NavLinkProps {
    filled?: boolean;
}
const NavLink = styled.button<NavLinkProps>`
    background: ${(props) =>
        props?.filled ? GlobalTheme.primaryColor : "transparent  "};
    color: ${(props) => (props?.filled ? "white" : "black")};
    padding: 5px 15px;
    font-weight: normal;
    font-size: 15px;
    border: 2px solid ${GlobalTheme.primaryColor};
    margin: 0 5px;
    border-radius: 5px;
    outline: none;
    transition: all 0.2s;

    &:hover {
        background: ${(props) =>
            !props.filled ? "#eee" : GlobalTheme.primaryShades.Shade1};
        border-color: ${(props) =>
            props.filled ? GlobalTheme.primaryShades.Shade1 : null};
    }

    &:active {
        background: ${(props) =>
            !props.filled ? "#aaa" : GlobalTheme.primaryShades.Shade2};
        border-color: ${(props) =>
            props.filled ? GlobalTheme.primaryShades.Shade2 : null};
    }
`;

export default Navbar;
