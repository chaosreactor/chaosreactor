import styled from '@emotion/styled';

import { Header } from '../components/Header';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.@emotion/styled file.
   */
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <Header />
        </div>
      </div>
    </StyledPage>
  );
}

export default Index;
