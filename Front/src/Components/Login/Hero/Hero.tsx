import React from "react";
import styled from "styled-components";
import { GlobalTheme } from "../../Theme/Theme";
const HeroPicUrl = require("../../../../Assets/undraw_Data_re_80ws.svg");

const Hero = () => {
    return (
        <HeroContainer>
            <HeroChilds>
                <Title>
                    Plan, Track, Finish Your Project With Project Studio
                </Title>
                <p
                    style={{
                        fontSize: "20px",
                        color: GlobalTheme.primaryColor,
                    }}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                    ut ipsam eveniet! Eligendi obcaecati odio illo, amet
                    reprehenderit facilis sapiente itaque a quae, deserunt ut
                    odit! Libero architecto iste omnis.
                </p>
            </HeroChilds>
            <HeroChilds>
                <HeroIMG src={HeroPicUrl}></HeroIMG>
            </HeroChilds>
        </HeroContainer>
    );
};

const HeroContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 860px) {
        & {
            flex-direction: column-reverse;
        }
    }
`;

const HeroChilds = styled.div`
    flex: 1;
    padding: 5%;
`;

const Title = styled.span`
    color: ${GlobalTheme.primaryColor};
    font-size: 48px;
    font-weight: bold;
    transition: all 0.3s;

    @media screen and (max-width: 500px) {
        & {
            font-size: 36px;
        }
    }
`;

const HeroIMG = styled.img`
    width: 100%;
    height: 100%;
`;

export default Hero;
