import { useState, useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import styles from "../../styles/styles.module.css";
import { PieChartProps, IPieDataItem } from "../../interfaces/types";
import { chartColors, margins } from "../../utils/chartUtilities";

const PieChart = ({ clientAccounts, onSegmentClick }: PieChartProps) => {
  const ref = useRef(null);
  const [isChartClicked, setIsChartClicked] = useState(false);

  useEffect(() => {
    if (!isChartClicked) {
      onSegmentClick(null);
    }
  }, [isChartClicked]);

  // Calculate the counts of positive and negative balances
  const positiveCount = clientAccounts.filter(
    ({ balance }) => balance >= 0
  ).length;
  const negativeCount = clientAccounts.length - positiveCount;
  const radius =
    Math.min(
      margins.width - 2 * margins.MARGIN_X,
      margins.height - 2 * margins.MARGIN_Y
    ) / 2;

  const pie = useMemo(() => {
    let pieData = [];
    if (positiveCount > 0) {
      pieData.push({ label: "Balance >=0", value: positiveCount });
    }
    if (negativeCount > 0) {
      pieData.push({ label: "Balance <0", value: negativeCount });
    }
    const pieGenerator = d3.pie<any, IPieDataItem>().value((d) => d.value);
    return pieGenerator(pieData);
  }, []);
  const arcGenerator = d3.arc();

  const shapes = pie.map((grp, i) => {
    // First arc is for the Pie
    const sliceInfo = {
      innerRadius: 0,
      outerRadius: radius,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const centroid = arcGenerator.centroid(sliceInfo);
    const slicePath = arcGenerator(sliceInfo);

    // Second arc is for the legend inflexion point
    const inflexionInfo = {
      innerRadius: radius + margins.INFLEXION_PADDING,
      outerRadius: radius + margins.INFLEXION_PADDING,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };
    const inflexionPoint = arcGenerator.centroid(inflexionInfo);
    const isRightLabel = inflexionPoint[0] > 0;
    const labelPosX = inflexionPoint[0] + 20 * (isRightLabel ? 1 : -1);
    const textAnchor = isRightLabel ? "start" : "end";
    const label = grp.data.label;

    return (
      <g
        key={i}
        className={styles.slice}
        onMouseEnter={() => {
          if (ref.current) {
            (ref.current as any).classList.add(styles.hasHighlight);
          }
        }}
        onMouseLeave={() => {
          if (ref.current) {
            (ref.current as HTMLElement).classList.remove(styles.hasHighlight);
          }
        }}
      >
        <path
          d={slicePath as string | undefined}
          fill={chartColors[i]}
          onClick={() => onSegmentClick(grp.data.label)}
        />
        <circle cx={centroid[0]} cy={centroid[1]} r={2} />
        <line
          x1={centroid[0]}
          y1={centroid[1]}
          x2={inflexionPoint[0]}
          y2={inflexionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <line
          x1={inflexionPoint[0]}
          y1={inflexionPoint[1]}
          x2={labelPosX}
          y2={inflexionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <text
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={inflexionPoint[1]}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={14}
        >
          {label}
        </text>
      </g>
    );
  });

  return (
    <>
      {clientAccounts.length && (
        <div>
          <svg
            data-testid="pieChart"
            width={margins.width}
            height={margins.height}
            style={{ display: "inline-block" }}
            onClick={() => setIsChartClicked(!isChartClicked)}
          >
            <g
              transform={`translate(${margins.width / 2}, ${
                margins.height / 2
              })`}
              className={styles.container}
              ref={ref}
            >
              {shapes}
            </g>
          </svg>
        </div>
      )}
    </>
  );
};

export default PieChart;
