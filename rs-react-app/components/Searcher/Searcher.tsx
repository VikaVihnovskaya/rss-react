import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetItemsQuery } from '../../slices/itemsSlice';
import SearchBar from '../SearchBar/SearchBar';
import ResultsList, { Item } from '../ResultsList/ResultsList';
import Pagination from '../Pagination/Pagination';
import ItemDetails from '../ItemDetails/ItemDetails';

const Searcher: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const [page, setPage] = useState(Number(query.page) || 1);
  const [searchTerm, setSearchTerm] = useState(
      (typeof window !== 'undefined' && localStorage.getItem('searchTerm')) || ''
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchTerm', searchTerm);
    }
    router.replace({
      query: { ...query, page: page.toString() },
    });
  }, [searchTerm, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.replace({
      query: { ...query, page: newPage.toString() },
    });
  };

  const handleItemClick = (item: Item, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setSelectedItem(item);
    setModalPosition({
      top: rect.top + window.scrollY + 20,
      left: rect.left + window.scrollX + 140,
    });
    router.replace({
      query: { ...query, details: getLastParam(item.url) },
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
    router.replace({
      query: { page: page.toString() },
    });
  };

  const unselectAll = () => {
    setSelectedItems([]);
  };

  const downloadSelectedItems = () => {};

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
