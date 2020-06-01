import styled from 'styled-components';
import { shade } from 'polished';

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

    span {
      display: flex;
      margin-left: auto;
      align-items: center;
      margin: 43px 24px 43px auto;
      font-weight: 400;
      font-size: 20px;
      color: #999591;

      svg {
        height: 24px;
        width: 24px;
        color: #ff9000;
        margin-right: 10px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    font-size: 20px;
    color: #999591;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    margin-bottom: 24px;
    display: block;
    padding-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    font-weight: 400;
    display: flex;
    align-items: center;
    color: #f4ede8;
    font-size: 16px;
    line-height: 21px;
    width: 70px;

    svg {
      width: 20px;
      height: 20px;
      color: #ff9000;
      margin-right: 10px;
    }
  }

  div {
    padding: 16px;
    margin-left: 26px;
    background: #3e3b47;
    border-radius: 10px;
    display: flex;
    flex: 1;
    align-items: center;

    img {
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 16px;
      font-weight: 500;
      font-size: 20px;
      line-height: 26px;
      color: #f4ede8;
    }
  }
`;

export const Calendar = styled.aside`
  width: 360px;
  margin-left: 120px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
