import React from 'react';

interface RegionFilterProps {
  filterRegion: string;
  onFilterRegionChange: (region: string) => void;
}

const RegionFilter: React.FC<RegionFilterProps> = ({ filterRegion, onFilterRegionChange }) => {
  return (
    <select
      value={filterRegion}
      onChange={(e) => onFilterRegionChange(e.target.value)}
    >
      <option value="">All Regions</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
};

export default RegionFilter;
