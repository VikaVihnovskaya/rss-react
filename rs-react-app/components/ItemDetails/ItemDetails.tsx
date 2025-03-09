import React, { useEffect, useRef } from 'react';
import { useGetItemDetailsQuery } from './../../slices/itemDetailsSlice';

interface ItemDetailsProps {
  url: string;
  onClose: () => void;
  position: { top: number; left: number };
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  url,
  onClose,
  position,
}) => {
  const { data: details, error, isLoading } = useGetItemDetailsQuery(url);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="floating-modal"
      style={{ top: position.top, left: position.left }}
    >
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error.toString()}</div>
      ) : (
        <div>
          <h2>{details?.name}</h2>
          <p>
            <strong>Gender:</strong> {details?.gender}
          </p>
          <p>
            <strong>Height:</strong> {details?.height}
          </p>
          <p>
            <strong>Weight:</strong> {details?.mass}
          </p>
          <p>
            <strong>Hair Color:</strong> {details?.hairColor}
          </p>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
