import { Grommet } from 'grommet';
import Header from "./Header";
import styled from 'styled-components';

const LayoutStyle = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
`;

const Layout = props => (
  <Grommet>
    <LayoutStyle>
      <Header />
      {props.children}
    </LayoutStyle>
  </Grommet>
);

export default Layout;
