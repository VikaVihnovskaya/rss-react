import React from 'react';

export interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  flags: {
    svg: string;
  };
  cca3: string;
}

interface CountryCardProps {
  country: Country;
  isVisited: boolean;
  onClick: (countryName: string) => void;
}

const CountryCard: React.FC<CountryCardProps> = React.memo(
  ({ country, isVisited, onClick }) => {
    return (
      <div
        onClick={() => onClick(country.name.common)}
        data-country-name={country.name.common}
        className={isVisited ? 'country-card visited' : 'country-card'}
      >
        <h3>{country.name.common}</h3>
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          width={100}
        />
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
      </div>
    );
  }
);

CountryCard.displayName = 'CountryCard';

export default CountryCard;
