import Link from "next/link";
import styled from 'styled-components';
// https://res.cloudinary.com/burncartel/image/upload/v1561906021/gringo-city-night.jpg

const LinkStyle = styled.a`
  margin-right: 15px;
  text-decoration: underline;
  color: blue;
  &:hover {
    cursor: pointer;
  }
  
`;

const Header = () => (
  <div>
    <Link href="/">
      <LinkStyle>Home</LinkStyle>
    </Link>
    <Link href="/about">
      <LinkStyle>About</LinkStyle>
    </Link>
  </div>
);

export default Header;
