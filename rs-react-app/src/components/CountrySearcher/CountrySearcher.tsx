import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import CountryCard, { Country} from '../CountryCard/CountryCard';
import RegionFilter from '../RegionFilter/RegionFilter';
import SortOptions from '../SortOptions/SortOptions';

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

        <RegionFilter
          filterRegion={filterRegion}
          onFilterRegionChange={setFilterRegion}
        />

        <SortOptions
          sortOption={sortOption}
          onSortOptionChange={setSortOption}
        />
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
