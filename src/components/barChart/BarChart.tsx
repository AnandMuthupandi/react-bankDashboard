import { useEffect, useState } from "react";
import { scaleBand, scaleLinear } from "d3";
import {
  BarChartProps,
  IClientAccounts,
  ITooltip,
} from "../../interfaces/types";
import Bars from "./Bars";
import styles from "../../styles/styles.module.css";
import { AxisBottom, AxisLeft } from "./Axis";

export default function BarChart({
  clientAccounts,
  cardTypes,
  selectedSegment,
}: BarChartProps) {
  const [clientAccountData, setClientAccountData] = useState<IClientAccounts[]>(
    []
  );

  const [tooltipState, setTooltipState] = useState<ITooltip | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setClientAccountData(clientAccounts);
    setSuccess(true);
  }, [clientAccounts]);

  const highlightedAccounts =
    selectedSegment &&
    clientAccountData.filter(({ balance }) =>
      selectedSegment === "Balance >=0" ? balance >= 0 : balance < 0
    );

  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 350 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const maxYByCardType: Record<string, number> = clientAccountData.reduce(
    (acc, { card_type, balance }) => {
      if (!acc[card_type] || balance > acc[card_type]) {
        acc[card_type] = balance;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  if (success) {
    const scaleX = scaleBand()
      .domain(clientAccountData.map(({ card_type }) => card_type))
      .range([0, width])
      .padding(0.4);

    const minYValue = Math.min(0, Math.min(...Object.values(maxYByCardType)));
    const maxYValue = Math.max(...Object.values(maxYByCardType));
    const scaleY = scaleLinear()
      .domain([minYValue, maxYValue])
      .range([height, 0]);

    return (
      <>
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
            <AxisLeft scaleLeft={scaleY} />
            <Bars
              data={clientAccountData}
              height={height}
              scaleX={scaleX}
              scaleY={scaleY}
              onMouseEnter={(event, balance, cardType) => {
                setTooltipState({
                  x: event.clientX,
                  y: event.clientY,
                  balance: balance,
                  cardType: cardType,
                });
              }}
              onMouseLeave={() => setTooltipState(null)}
              selectedSegment={selectedSegment}
              highlightedAccounts={highlightedAccounts}
            />
          </g>
        </svg>
        {tooltipState !== null ? (
          <div
            className={styles.tooltip}
            style={{ top: tooltipState.y, left: tooltipState.x }}
          >
            <span className={styles.tooltipTitle}>
              {tooltipState.cardType} : {tooltipState.balance}
            </span>
          </div>
        ) : null}
      </>
    );
  } else {
    return <></>;
  }
}
