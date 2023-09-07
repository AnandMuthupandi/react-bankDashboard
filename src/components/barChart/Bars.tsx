import React from "react";
import { BarsProps, IClientAccounts } from "../../interfaces/types";
import { colorMapping } from "../../utils/utilities";

function Bars({
  data,
  height,
  scaleX,
  scaleY,
  onMouseEnter,
  onMouseLeave,
  highlightedAccounts,
}: BarsProps) {
  return (
    <>
      {data.map(({ id, card_type, balance }) => {
        const isHighlighted =
          highlightedAccounts &&
          highlightedAccounts.some(
            (account: IClientAccounts) => account.card_type === card_type
          );

        return (
          <rect
            data-testid="Bars"
            key={`bar-${id}`}
            x={scaleX(card_type)}
            y={Math.max(0, scaleY(balance))}
            width={scaleX.bandwidth()}
            height={Math.max(0, height - scaleY(balance))}
            fill={colorMapping(card_type)}
            onMouseEnter={(event) => onMouseEnter(event, balance, card_type)}
            onMouseLeave={onMouseLeave}
            opacity={isHighlighted ? 0.5 : 1}
          />
        );
      })}
    </>
  );
}

export default Bars;
