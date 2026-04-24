import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || 'Nie udalo sie pobrac teams.');
        }
        return data;
      })
      .then(data => {
        const results = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
            ? data
            : [];
        setTeams(results);
        setError('');
        console.log('Fetched Teams:', results);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setTeams([]);
        setError(err.message);
      });
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header bg-info text-white">
        <h2 className="h4 mb-0">Teams</h2>
      </div>
      <div className="card-body">
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {teams.length === 0 ? (
          <div className="alert alert-info">Brak danych do wyświetlenia.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-light">
                <tr>
                  {Object.keys(teams[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    {Object.values(team).map((val, i) => (
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

export default Teams;
