import styled from "styled-components";
import { GlobalTheme } from "../Theme/Theme";

export const Button = styled.button`
    border: none;
    outline: none;
    background: ${GlobalTheme.primaryColor};
    color: #fff;
    padding: 8px 25px;
    transition: all 0.2s;
    border-radius: 4px;

    &:hover {
        background: ${GlobalTheme.primaryShades.Shade1};
    }
`;
