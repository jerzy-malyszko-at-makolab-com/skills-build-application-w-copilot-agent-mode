import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || 'Nie udalo sie pobrac activities.');
        }
        return data;
      })
      .then(data => {
        const results = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
            ? data
            : [];
        setActivities(results);
        setError('');
        console.log('Fetched Activities:', results);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setActivities([]);
        setError(err.message);
      });
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h2 className="h4 mb-0">Activities</h2>
      </div>
      <div className="card-body">
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {activities.length === 0 ? (
          <div className="alert alert-info">Brak danych do wyświetlenia.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-light">
                <tr>
                  {Object.keys(activities[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    {Object.values(activity).map((val, i) => (
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

export default Activities;
