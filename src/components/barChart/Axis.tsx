import { select, axisBottom, axisLeft } from "d3";
import React, { useEffect, useRef } from "react";
import { AxisBottomProps, AxisLeftProps } from "../../interfaces/types";

export function AxisBottom({ scale, transform }: AxisBottomProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

export function AxisLeft({ scaleLeft }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scaleLeft));
    }
  }, [scaleLeft]);

  return <g ref={ref} />;
}
