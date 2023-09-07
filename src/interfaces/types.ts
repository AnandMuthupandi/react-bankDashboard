import { ScaleBand, ScaleLinear } from "d3";
import { MouseEvent } from "react";

export interface IData {
  id: string;
  card_type: string;
  balance: number;
}

export interface IGroupedData {
  card_type: string;
  values: number[];
}

export interface IClient {
  label: string;
  value: string;
}

export interface IClientNames {
  id: string;
  name: string;
}

export interface IClientAccounts {
  balance: number;
  card_type: string;
  created: string;
  id: string;
  number: number;
}

export interface IClientDetails {
  id: string;
  firstname: string;
  name: string;
  birthday: string;
  address: string;
  created: string;
  accounts: [];
}

export interface BarChartProps {
  clientAccounts: IClientAccounts[];
  cardTypes: IClientAccounts[];
  selectedSegment: string;
}
export interface ITooltip {
  x: number;
  y: number;
  balance: number;
  cardType: string;
}

export interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

export interface AxisLeftProps {
  scaleLeft: ScaleLinear<number, number, never>;
}

export interface BarsProps {
  data: IData[];
  height: number;
  scaleX: AxisBottomProps["scale"];
  scaleY: AxisLeftProps["scaleLeft"];
  onMouseEnter: (
    e: MouseEvent<SVGPathElement>,
    balance: number,
    cardType: string
  ) => void;
  onMouseLeave: () => void;
  selectedSegment: string;
  highlightedAccounts: any;
}

export interface ChartProps {
  clientId: string;
  openModal: () => void;
}

export interface PieChartProps {
  clientAccounts: IClientAccounts[];
  onSegmentClick: (segmentData: any) => void;
}

export interface IPieDataItem {
  label: string;
  value: number;
}
