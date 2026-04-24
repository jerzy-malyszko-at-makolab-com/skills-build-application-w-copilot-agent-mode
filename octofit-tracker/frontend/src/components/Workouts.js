import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || 'Nie udalo sie pobrac workouts.');
        }
        return data;
      })
      .then(data => {
        const results = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
            ? data
            : [];
        setWorkouts(results);
        setError('');
        console.log('Fetched Workouts:', results);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setWorkouts([]);
        setError(err.message);
      });
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header bg-secondary text-white">
        <h2 className="h4 mb-0">Workouts</h2>
      </div>
      <div className="card-body">
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {workouts.length === 0 ? (
          <div className="alert alert-info">Brak danych do wyświetlenia.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-light">
                <tr>
                  {Object.keys(workouts[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    {Object.values(workout).map((val, i) => (
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

export default Workouts;
