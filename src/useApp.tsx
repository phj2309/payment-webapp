import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Transaction } from "./types";

export const useApp = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [timeframe, setTimeframe] = useState<"week" | "month">("week");
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMenu, setSelectedMenu] = useState<string>("Btn3");

  useEffect(() => {
    axios
      .get("/data/mockData.json")
      .then((response) => {
        const processedData = response.data.map((transaction: Transaction) => ({
          ...transaction,
          amount: parseFloat(transaction.amount),
          date: new Date(transaction.timestamp).toISOString().split("T")[0],
        }));
        setTransactions(processedData);
      })
      .catch((error) => console.error("Error fetching mock data:", error));
  }, []);

  const generateDateLabels = useCallback(
    (timeframe: "week" | "month", endDate: Date) => {
      const dates = [];
      const days = timeframe === "week" ? 7 : 30;
      for (let i = 0; i < days; i++) {
        const date = new Date(endDate);
        date.setDate(endDate.getDate() - i);
        dates.unshift(date.toISOString().split("T")[0]);
      }
      return dates;
    },
    []
  );

  const filteredData = useMemo(() => {
    const days = timeframe === "week" ? 7 : 30;

    return transactions.filter((transaction) => {
      const diffTime = Math.abs(
        selectedDate.getTime() - new Date(transaction.timestamp).getTime()
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= days;
    });
  }, [transactions, timeframe, selectedDate]);

  const handleTimeframeChange = useCallback(
    (newTimeframe: "week" | "month") => {
      setTimeframe(newTimeframe);
    },
    []
  );

  const handleDateChange = useCallback((date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const getDisplayData = useMemo(() => {
    let data = filteredData.reverse();
    if (filter === "income") {
      data = data
        .filter((transaction) => parseFloat(transaction.amount) > 0)
        .slice(0, 10);
    } else if (filter === "expense") {
      data = data
        .filter((transaction) => parseFloat(transaction.amount) < 0)
        .slice(0, 10);
    } else if (filter === "all") {
      data = filteredData.slice(0, 20);
    }
    return data;
  }, [transactions, filter]);

  const graphData = useMemo(() => {
    return filteredData;
  }, [filteredData]);

  return {
    displayData: graphData,
    transactionsData: getDisplayData,
    timeframe,
    filter,
    selectedDate,
    selectedMenu,
    setSelectedMenu,
    setFilter,
    handleTimeframeChange,
    handleDateChange,
    generateDateLabels,
  };
};
