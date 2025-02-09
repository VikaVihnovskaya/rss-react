import React, { useEffect, useState, useRef } from 'react';

interface ItemDetails {
  name: string;
  gender: string;
  height: string;
  mass: string;
  hairColor: string;
}

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
  const [details, setDetails] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${url}`);
        if (!response.ok) throw new Error('Failed to load details');
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [url]);

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
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
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
      )}{' '}
    </div>
  );
};

export default ItemDetails;
