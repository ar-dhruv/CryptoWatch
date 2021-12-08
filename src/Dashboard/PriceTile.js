import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3 , fontSizeBig} from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";

const JustifyRight = styled.div`
  justify-self: right;
`;

const TickerPrice = styled.div`
${fontSizeBig}
`

const numberFormat = (number) => {
  return +(number + "").slice(0, 7);
};

const PriceTileStyled = styled(SelectableTile)`
  ${(props) =>
    props.compact &&
    css`
      ${fontSize3}
    `}
`;

function PriceTile({ sym, data }) {
  return (
    <PriceTileStyled>
      <CoinHeaderGridStyled>
        <div> {sym} </div>
        <JustifyRight> {numberFormat(data.CHANGEPCT24HOUR)} </JustifyRight>
      </CoinHeaderGridStyled>
      <TickerPrice>
          {numberFormat(data.PRICE)}
      </TickerPrice>
    </PriceTileStyled>
  );
}

export default function ({ price, index }) {
  let sym = Object.keys(price)[0];
  let data = price[sym]["USD"];

  return <PriceTile sym={sym} data={data}></PriceTile>;
}
