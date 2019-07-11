import React from 'react';
import { Grommet } from "grommet";
import styled, { ThemeProvider } from "styled-components";
import Header from "./Header";

const LayoutStyle = styled.div`
  /* margin: 20px; */
  /* padding: 20px; */
  /* border: 1px solid #ddd; */
`;

// https://github.com/grommet/grommet/wiki/Grommet-v2-theming-documentation

const theme = {
  breakpoint: {
    mobileXS: "380px",
    mobileS: "420px",
    mobileM: "580px",
    mobileL: "660px",
    tablet: "780px",
    tabletWide: "1000px",
    desktop: "1200px",
    desktopWide: "1600px"
  },
  headerTextHeight: "72px",
  fontDefault: "sans-serif",
  fontPost: `'Montserrat', sans-serif`,
  fontHeader: `'Quicksand', sans-serif`,
  fontSubheader: "Poppins",
  fontLocation: `'Dancing Script', cursive`
};

const Layout = props => (
  <ThemeProvider theme={theme}>
    <Grommet theme={theme}>
      <LayoutStyle>
        {/* <Header /> */}
        {props.children}
      </LayoutStyle>
    </Grommet>
  </ThemeProvider>
);

export default Layout;
