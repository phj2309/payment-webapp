import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TransactionItem = styled.div`
  display: flex;
  flex-direction: row;
`;

export const GraySquare = styled.div`
  width: 51px;
  height: 51px;
  border-radius: 8px;
  background-color: #e2e2e2;
  margin-right: 10px;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Name = styled.div`
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const GrayText = styled.div<{ left?: string }>`
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  text-align: ${({ left }) => (left ? "left" : "right")};
`;

export const Amount = styled.div`
  color: #363062;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: right;
`;
