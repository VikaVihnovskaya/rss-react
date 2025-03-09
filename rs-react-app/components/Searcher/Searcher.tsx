'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetItemsQuery } from '../../slices/itemsSlice';
import SearchBar from '../SearchBar/SearchBar';
import ResultsList, { Item } from '../ResultsList/ResultsList';
import Pagination from '../Pagination/Pagination';
import ItemDetails from '../ItemDetails/ItemDetails';

const Searcher: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryPage = searchParams.get('page');
  const [page, setPage] = useState<number>(Number(queryPage) || 1);
  const [searchTerm, setSearchTerm] = useState<string>(
    (typeof window !== 'undefined' && localStorage.getItem('searchTerm')) || ''
  );
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const { data, error, isLoading } = useGetItemsQuery({ searchTerm, page });

  function getLastParam(url: string): string {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchTerm', searchTerm);
    }
    router.push(`?page=${page}`);
  }, [searchTerm, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };

  const handleItemClick = (item: Item, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setSelectedItem(item);
    setModalPosition({
      top: rect.top + window.scrollY + 20,
      left: rect.left + window.scrollX + 140,
    });
    router.push(`?page=${page}&details=${getLastParam(item.url)}`);
  };

  const handleItemSelect = (item: Item, isSelected: boolean) => {
    setSelectedItems((prevSelectedItems) => {
      if (isSelected) {
        return [...prevSelectedItems, item];
      } else {
        return prevSelectedItems.filter(
          (selected) => selected.url !== item.url
        );
      }
    });
  };

  const closeDetails = () => {
    setSelectedItem(null);
    router.push(`?page=${page}`);
  };

  const unselectAll = () => {
    setSelectedItems([]);
  };

  const downloadSelectedItems = () => {

  };

  return (
    <div className="container">
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={() => {}}
      />
      <div className="content">
        <div className={`left-section ${selectedItem ? 'shrink' : ''}`}>
          <ResultsList
            items={data?.results || []}
            loading={isLoading}
            error={error ? error.toString() : null}
            onItemClick={handleItemClick}
            onItemSelect={handleItemSelect}
            selectedItems={selectedItems}
          />
          <Pagination currentPage={page} onPageChange={handlePageChange} />
        </div>
        {selectedItem && modalPosition && (
          <div className="right-section">
            <ItemDetails
              url={selectedItem.url}
              onClose={closeDetails}
              position={modalPosition}
            />
          </div>
        )}
      </div>
      {selectedItems.length > 0 && (
        <div className="flyout-text">
          <p>{selectedItems.length} items are selected</p>
          <div className="flyout">
            <button className="flyout-btn" onClick={unselectAll}>
              Unselect all
            </button>
            <button className="flyout-btn" onClick={downloadSelectedItems}>
              Download
            </button>
          </div>
        </div>
      )}
      <button
        className="error-button"
        onClick={() => {
          throw new Error('Test Error is thrown');
        }}
      >
        Throw Error
      </button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Searcher), { ssr: false });
