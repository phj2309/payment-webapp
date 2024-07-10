import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
  }
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 28px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-bottom: 100px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  color: #000000;
`;

export const NotiImg = styled.img`
  width: 24px;
  height: 24px;
  display: inline-block;
  background-size: cover;
  cursor: pointer;
`;

export const Button = styled.button<{ selected: boolean }>`
  background-color: transparent;
  color: ${({ selected }) => (selected ? "#363062" : "#BDBDBD")};
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  padding: 0 15px 0 0;

  &:hover {
    color: #363062;
  }
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  .react-datepicker {
    width: 100%;
    max-width: none;
    left: -50px;
    transform: none;

    .react-datepicker__day--outside-month {
      cursor: default;
      visibility: hidden;
    }
  }

  .react-datepicker-wrapper input[type="text"] {
    border: none;
    color: #363062;
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
    text-align: right;
  }

  input:focus {
    outline: none;
  }
`;

export const ChartContainer = styled.div`
  height: 200px;

  @media (max-width: 600px) {
    height: 171px;
  }
`;

export const DateTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DateText = styled.div`
  background-color: transparent;
  color: #bdbdbd;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
`;

export const TooltipContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const TooltipContent = styled.div`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

export const TransactionListContainer = styled.div`
  margin-top: 20px;
`;

export const FilterButtons = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ToggleWrapper = styled.div`
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
`;

export const ToggleButton = styled.button<{ selected: boolean }>`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  width: 86px;
  height: 34px;
  padding: 5px 17px;
  gap: 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#363062" : "transparent")};
  color: ${({ selected }) => (selected ? "#FFFFFF" : "#6B6B6B")};
  transition: background-color 0.3s, color 0.3s;
`;

export const TransactionListTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin: 50px 0 30px 0;
  color: #000000;

  @media (max-width: 600px) {
    margin: 30px 0 10px 0;
  }
`;

export const LegendsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const Bar = styled.div<{ selected?: boolean }>`
  width: 32px;
  height: 5px;
  background-color: ${({ selected }) => (selected ? "#363062" : "#5BDAA4")};
  margin-right: 10px;
`;

export const BarText = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 23px;
  color: #363062;
  margin-right: 20px;
`;

export const BottomNavBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const NavButton = styled.button`
  min-width: 24px;
  height: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 0px;
`;

export const NavButtonImg = styled.img`
  width: 24px;
  height: 24px;
`;

export const NavButtonBar = styled.div<{ selected?: boolean }>`
  width: 100%;
  height: 5px;
  border-radius: 4px 4px 0px 0px;
  background-color: ${({ selected }) => (selected ? "#363062" : "transparent")};
`;
