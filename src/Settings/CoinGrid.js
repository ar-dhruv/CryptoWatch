import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

function getLowerSectionCoins(coinList, filteredCoins) {
  return (
    (filteredCoins && Object.keys(filteredCoins)) ||
    Object.keys(coinList).slice(0, 100)
  );
}

function getCoinsToDisplay(coinList, topSection, favourites, filterCoins) {
  return topSection ? favourites : getLowerSectionCoins(coinList, filterCoins);
}

export default function ({ topSection }) {
  return (
    <AppContext.Consumer>
      {({ coinList, favourites, filteredCoins }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(
            coinList,
            topSection,
            favourites,
            filteredCoins
          ).map((coinKey) => (
            <CoinTile key={coinKey} topSection={topSection} coinKey={coinKey} />
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
}
