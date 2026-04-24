import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/users/`;

  useEffect(() => {
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || 'Nie udalo sie pobrac users.');
        }
        return data;
      })
      .then(data => {
        const results = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data)
            ? data
            : [];
        setUsers(results);
        setError('');
        console.log('Fetched Users:', results);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setUsers([]);
        setError(err.message);
      });
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header bg-warning text-dark">
        <h2 className="h4 mb-0">Users</h2>
      </div>
      <div className="card-body">
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {users.length === 0 ? (
          <div className="alert alert-info">Brak danych do wyświetlenia.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-light">
                <tr>
                  {Object.keys(users[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    {Object.values(user).map((val, i) => (
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

export default Users;
