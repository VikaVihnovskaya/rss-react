import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SearchInput from '../SearchInput/SearchInput';

interface Country {
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

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filterRegion, setFilterRegion] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [visitedCountries, setVisitedCountries] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('visitedCountries') || '[]');
  });

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data: Country[]) => setCountries(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
  }, [visitedCountries]);

  const handleVisitCountry = useCallback((countryName: string) => {
    setVisitedCountries((prev) => {
      const isVisited = prev.includes(countryName);
      const updatedVisited = isVisited
        ? prev.filter((name) => name !== countryName)
        : [...prev, countryName];

      const countryElement = document.querySelector(
        `[data-country-name="${countryName}"]`
      );
      if (countryElement) {
        countryElement.classList.toggle('visited', !isVisited);
      }

      return updatedVisited;
    });
  }, []);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country.region.toLowerCase().includes(filterRegion.toLowerCase())
    );
  }, [countries, filterRegion]);

  const searchedCountries = useMemo(() => {
    return filteredCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [filteredCountries, searchTerm]);

  const sortedCountries = useMemo(() => {
    switch (sortOption) {
      case 'name-asc':
        return [...searchedCountries].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
      case 'name-desc':
        return [...searchedCountries].sort((a, b) =>
          b.name.common.localeCompare(a.name.common)
        );
      case 'population-asc':
        return [...searchedCountries].sort(
          (a, b) => a.population - b.population
        );
      case 'population-desc':
        return [...searchedCountries].sort(
          (a, b) => b.population - a.population
        );
      default:
        return searchedCountries;
    }
  }, [searchedCountries, sortOption]);

  return (
    <div>
      <h1>Country Explorer</h1>

      <div>

        <SearchInput
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />

        <select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">No Sorting</option>
          <option value="name-asc">Sort by Name (A-Z)</option>
          <option value="name-desc">Sort by Name (Z-A)</option>
          <option value="population-asc">
            Sort by Population (Low to High)
          </option>
          <option value="population-desc">
            Sort by Population (High to Low)
          </option>
        </select>
      </div>

      <div className="container">
        {sortedCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            isVisited={visitedCountries.includes(country.name.common)}
            onClick={handleVisitCountry}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
