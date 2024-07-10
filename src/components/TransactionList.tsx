import React from "react";
import { Transaction } from "../types";

import {
  ListContainer,
  TransactionItem,
  Amount,
  GraySquare,
  LeftContainer,
  RightContainer,
  Name,
  GrayText,
} from "./TransactionList.style";

interface TransactionListProps {
  transactions: Transaction[];
}

const capitalizeFirstLetter = (str: string): string => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const formatTimestamp = (ts: string): string => {
    const date = new Date(ts);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = hours.toString().padStart(2, "0");
    const strMinutes = minutes.toString().padStart(2, "0");
    return `${strHours}.${strMinutes} ${ampm}`;
  };

  return (
    <ListContainer>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.timestamp}>
          <GraySquare />
          <LeftContainer>
            <Name>{transaction.name}</Name>
            <GrayText left="left">
              {capitalizeFirstLetter(transaction.type)}
            </GrayText>
          </LeftContainer>

          <RightContainer>
            <Amount>
              {`${parseFloat(transaction.amount) > 0 ? "+$" : "-$"}${Math.abs(
                parseFloat(transaction.amount)
              )}`}
            </Amount>
            <GrayText>{formatTimestamp(transaction.timestamp)}</GrayText>
          </RightContainer>
        </TransactionItem>
      ))}
    </ListContainer>
  );
};

export default TransactionList;
