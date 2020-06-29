import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    background: #28262e;
    padding: 47px 60px;

    a {
      text-decoration: none;
      color: #999591;

      svg {
        width: 34px;
        height: 34px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: -130px auto 0;

  form {
    flex-direction: column;
    display: flex;

    margin: 80px 0;
    width: 400px;
    height: 452px;
    margin-top: 32px;

    h1 {
      margin: 32px 0 24px;
      font-size: 20px;
      text-align: left;
      line-height: 26px;
      color: #f4ede8;
      font-weight: 500;
    }

    > button {
      padding: 16px 0;
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  width: 186px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    cursor: pointer;
    border: 0;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      height: 20px;
      width: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
