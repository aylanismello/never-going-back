import React from 'react';
import Link from "next/link";
import { Heading } from 'grommet';
import styled from 'styled-components';

const LinkStyle = styled.a`
  margin-right: 15px;
  text-decoration: underline;
  color: blue;
  &:hover {
    cursor: pointer;
  }
`;

const HeroStyle = styled.div`
  position: relative;
  background-image: url("https://res.cloudinary.com/burncartel/image/upload/v1561906021/gringo-city-night.jpg");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 350px;
`;

const HeroContentContainer = styled.span`
  position: absolute;
  text-align: left;

  left: 50%;
  top: 30%;
  width: 500px;
  transform: translate(-50%, -50%);
  color: white;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
  text-shadow: 0 1px 10px #444444;

  @media (max-width: ${props => props.theme.breakpoint.mobileL}) {
    width: 90%;
  }
`;

const HeroContent = styled.div`
  width: 100%;
`;

export default ({ children }) => (
  <div>
    <Heading>Never Going Back</Heading>
    <HeroStyle>
      <HeroContentContainer className="HeroContentContainer">
        <HeroContent className="HeroContent">
          not everywhere is awesome.
          <br />
          where would you rather not go back to?
          {children}
        </HeroContent>
      </HeroContentContainer>
    </HeroStyle>
  </div>
);
