import React, { useEffect, useState } from 'react';

interface ItemDetailsProps {
  url: string;
  onClose: () => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ url, onClose }) => {
  const [details, setDetails] = useState<null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${url}`);
        if (!response.ok) throw new Error('Failed to load details');

        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [url]);

  return (
    <div className="details-container">
      <button onClick={onClose}>Close</button>
      {loading ? (
        <p>Loading details...</p>
      ) : details ? (
        <div>
          <h2>{details.name}</h2>
          <p>Director: {details.gender}</p>
          <p>Episode: {details.episode_id}</p>
        </div>
      ) : (
        <p>No details found.</p>
      )}
    </div>
  );
};

export default ItemDetails;
