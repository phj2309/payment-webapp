import React, { useMemo } from "react";
import { ResponsiveLine, PointTooltipProps } from "@nivo/line";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TransactionList from "./components/TransactionList";
import { useApp } from "./useApp";
import {
  GlobalStyle,
  Container,
  TitleWrapper,
  Title,
  NotiImg,
  TopWrapper,
  ToggleWrapper,
  ChartContainer,
  DateTextWrapper,
  DateText,
  FilterButtons,
  TransactionListContainer,
  ToggleButton,
  TransactionListTitle,
  DatePickerWrapper,
  Button,
  TooltipContainer,
  TooltipContent,
  LegendsWrapper,
  Bar,
  BarText,
  BottomNavBar,
  NavButton,
  NavButtonImg,
  NavButtonBar,
} from "./App.style";

const App: React.FC = () => {
  const {
    displayData,
    transactionsData,
    timeframe,
    filter,
    selectedDate,
    selectedMenu,
    setSelectedMenu,
    setFilter,
    handleTimeframeChange,
    handleDateChange,
    generateDateLabels,
  } = useApp();

  const generateChartData = useMemo(() => {
    const labels = generateDateLabels(timeframe, selectedDate);

    const groupedData: { [key: string]: { income: number; expense: number } } =
      labels.reduce((acc, label) => {
        acc[label] = { income: 0, expense: 0 };
        return acc;
      }, {} as { [key: string]: { income: number; expense: number } });

    displayData.forEach((transaction) => {
      const dateLabel = new Date(transaction.timestamp)
        .toISOString()
        .split("T")[0];
      if (groupedData[dateLabel]) {
        const amount = parseFloat(transaction.amount);
        if (amount > 0) {
          groupedData[dateLabel].income += amount;
        } else {
          groupedData[dateLabel].expense += Math.abs(amount);
        }
      }
    });

    const data = labels.map((label) => ({
      x: label,
      Income: groupedData[label].income,
      Expense: groupedData[label].expense,
    }));

    return [
      {
        id: "Income",
        data: data.map((d) => ({ x: d.x, y: d.Income })),
      },
      {
        id: "Expense",
        data: data.map((d) => ({ x: d.x, y: d.Expense })),
      },
    ];
  }, [displayData, timeframe, selectedDate, generateDateLabels]);

  const formatDateTime = (dateString: string) => {
    const options = {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    } as const;
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  const CustomTooltip = ({ point }: PointTooltipProps) => (
    <TooltipContainer style={{ top: point.y + 10, left: point.x }}>
      <TooltipContent>
        <p>{formatDateTime(point.data.xFormatted.toString())}</p>
        <p>{`${point.serieId}: ${point.data.yFormatted}`}</p>
      </TooltipContent>
    </TooltipContainer>
  );

  const startDate = new Date(selectedDate);
  const endDate = new Date(selectedDate);

  if (timeframe === "week") {
    startDate.setDate(selectedDate.getDate() - 7);
  } else {
    startDate.setMonth(selectedDate.getMonth() - 1);
  }

  const formatDate = (date: Date) => {
    if (timeframe === "week") {
      return new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
      }).format(date);
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
      }).format(date);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <TitleWrapper>
          <Title>Transactions</Title>
          <NotiImg
            src="/images/Noti.png"
            onClick={() => console.log("Noti!")}
          />
        </TitleWrapper>

        <TopWrapper>
          <ToggleWrapper>
            <ToggleButton
              selected={timeframe === "week"}
              onClick={() => handleTimeframeChange("week")}
            >
              Week
            </ToggleButton>
            <ToggleButton
              selected={timeframe === "month"}
              onClick={() => handleTimeframeChange("month")}
            >
              Month
            </ToggleButton>
          </ToggleWrapper>
          <DatePickerWrapper>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date("2023-11-01")}
              maxDate={new Date("2024-10-31")}
              dateFormat={
                timeframe === "week"
                  ? "MM dd, yyyy"
                  : (() => {
                      const startDate = new Date(selectedDate);
                      startDate.setMonth(startDate.getMonth() - 1);
                      const startDateString = `${
                        startDate.getMonth() + 1
                      } ${startDate.getDate()}`;
                      return `${startDateString} - MM dd, yyyy`;
                    })()
              }
              wrapperClassName="date-picker-wrapper"
            />
          </DatePickerWrapper>
        </TopWrapper>
        <LegendsWrapper>
          <Bar selected={true} />
          <BarText>Income</BarText>
          <Bar selected={false} /> <BarText>Expense</BarText>
        </LegendsWrapper>

        <ChartContainer>
          <ResponsiveLine
            data={generateChartData}
            margin={{ top: 10, right: 0, bottom: 50, left: 0 }}
            xScale={{ type: "time", format: "%Y-%m-%d" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            colors={["#363062", "#5BDAA4"]}
            lineWidth={3}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            enableSlices="x"
            enablePoints={false}
            enableGridX={false}
            enableGridY={false}
            useMesh={true}
            curve="natural"
            enableArea={true}
            // tooltip={CustomTooltip}
          />
          <DateTextWrapper>
            <DateText>{formatDate(startDate)}</DateText>
            <DateText>{formatDate(endDate)}</DateText>
          </DateTextWrapper>
        </ChartContainer>

        <TransactionListTitle>Recent Transactions</TransactionListTitle>

        <FilterButtons>
          <Button onClick={() => setFilter("all")} selected={filter === "all"}>
            All
          </Button>
          <Button
            onClick={() => setFilter("expense")}
            selected={filter === "expense"}
          >
            Expense
          </Button>
          <Button
            onClick={() => setFilter("income")}
            selected={filter === "income"}
          >
            Income
          </Button>
        </FilterButtons>
        <TransactionListContainer>
          <TransactionList transactions={transactionsData} />
        </TransactionListContainer>

        <BottomNavBar>
          <NavButton onClick={() => setSelectedMenu("Btn1")}>
            <NavButtonImg src="/images/Menu1.png" alt="" />
            <NavButtonBar selected={selectedMenu === "Btn1"} />
          </NavButton>

          <NavButton onClick={() => setSelectedMenu("Btn2")}>
            <NavButtonImg src="/images/Menu2.png" alt="" />
            <NavButtonBar selected={selectedMenu === "Btn2"} />
          </NavButton>

          <NavButton onClick={() => setSelectedMenu("Btn3")}>
            {selectedMenu !== "Btn3" ? (
              <NavButtonImg src="/images/Menu3.png" alt="" />
            ) : (
              <NavButtonImg src="/images/Menu3_2.png" alt="" />
            )}
            <NavButtonBar selected={selectedMenu === "Btn3"} />
          </NavButton>

          <NavButton onClick={() => setSelectedMenu("Btn4")}>
            <NavButtonImg src="/images/Menu4.png" alt="" />
            <NavButtonBar selected={selectedMenu === "Btn4"} />
          </NavButton>
        </BottomNavBar>
      </Container>
    </>
  );
};

export default App;
