import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    background: transparent;
    border: 0;
    margin-left: auto;

    svg {
      color: #999591;
      height: 20px;
      width: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    border-radius: 50%;
    width: 56px;
    height: 56px;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  /* Ocupar todo espaço disponível */
  flex: 1;
  max-width: 640px;

  h1 {
    color: #f4ede8;
    font-size: 36px;
  }

  p {
    margin-top: 12px;
    color: #ff9000;
    display: flex;
    font-weight: bold;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      background: #ff9000;
      width: 2px;
      height: 12px;
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    display: flex;
    align-items: center;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    border-radius: 10px;
    margin-top: 24px;

    &::before {
      content: '';
      background: #ff9000;
      width: 2px;
      height: 80px;
    }

    img {
      margin: 16px 0 16px 24px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      font-weight: 500;
      color: #f4ede8;
      font-size: 24px;
    }

    > span {
      display: flex;
      margin-left: auto;
      align-items: center;
      margin: 43px 24px 43px auto;

      svg {
        height: 24px;
        width: 24px;
        color: #ff9000;
      }

      span {
        font-weight: 400;
        font-size: 20px;
        color: #999591;
        margin-left: 10px;
      }
    }
  }
`;

export const Calendar = styled.aside`
  width: 360px;
  margin-left: 120px;
`;
