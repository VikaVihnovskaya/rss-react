import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const MainPage: React.FC = () => {
  const formEntries = useSelector((state: RootState) => state.form.entries);

  return (
    <div>
      <h1 className="text font-bold">Submitted Data</h1>
      <div className="gap">
        {formEntries.map((entry, index) => (
          <div key={index}>
            <p>
              <strong>Name:</strong> {entry.name}
            </p>
            <p>
              <strong>Age:</strong> {entry.age}
            </p>
            <p>
              <strong>Email:</strong> {entry.email}
            </p>
            <p>
              <strong>Gender:</strong> {entry.gender}
            </p>
            {/*<p>*/}
            {/*  <strong>Country:</strong> {entry.country}*/}
            {/*</p>*/}
            <p>
              <strong>Terms Accepted:</strong>{' '}
              {entry.termsAccepted ? 'Yes' : 'No'}
            </p>
            {/*{entry.picture && <img src={entry.picture} alt="Uploaded" />}*/}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
