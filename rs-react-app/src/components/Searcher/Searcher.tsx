import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetItemsQuery } from '../../slices/itemsSlice';
import SearchBar from '../SearchBar/SearchBar';
import ResultsList from '../ResultsList/ResultsList';
import Pagination from '../Pagination/Pagination';
import ItemDetails from '../ItemDetails/ItemDetails';
import { Item } from '../ResultsList/ResultsList';

const Searcher: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const { data, error, isLoading } = useGetItemsQuery({ searchTerm, page });

  function getLastParam(url: string) {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
  }

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', page.toString());
      return params;
    });
  }, [searchTerm, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', newPage.toString());
      return params;
    });
  };

  const handleItemClick = (item: Item, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setSelectedItem(item);
    setModalPosition({
      top: rect.top + window.scrollY + 20,
      left: rect.left + window.scrollX + 140,
    });
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('details', getLastParam(item.url));
      return params;
    });
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
    setSearchParams({ page: page.toString() });
  };

  const unselectAll = () => {
    setSelectedItems([]);
  };

  const downloadSelectedItems = () => {
    const parser = new Parser();
    const csv = parser.parse(selectedItems);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedItems.length}_items.csv`);
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

export default Searcher;
