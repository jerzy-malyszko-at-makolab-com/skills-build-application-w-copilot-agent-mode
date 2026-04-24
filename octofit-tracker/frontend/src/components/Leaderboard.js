import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState('');
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || 'Nie udalo sie pobrac leaderboard.');
        }
        return data;
      })
      .then(data => {
        const results = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
            ? data
            : [];
        setLeaders(results);
        setError('');
        console.log('Fetched Leaderboard:', results);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLeaders([]);
        setError(err.message);
      });
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header bg-success text-white">
        <h2 className="h4 mb-0">Leaderboard</h2>
      </div>
      <div className="card-body">
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {leaders.length === 0 ? (
          <div className="alert alert-info">Brak danych do wyświetlenia.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-light">
                <tr>
                  {Object.keys(leaders[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader, idx) => (
                  <tr key={leader.id || idx}>
                    {Object.values(leader).map((val, i) => (
                      <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
