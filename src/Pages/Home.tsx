import React from 'react';
import { GetAllUsersComponent } from '../generated/components';

export function Home() {
  return (
    <GetAllUsersComponent>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        if (!data || !data.allUsersList) return <p>No data!</p>;
        return (
          <div>
            <h1>All users</h1>
            {data.allUsersList.map(({ firstName, lastName, nodeId }) => (
              <p key={nodeId}>
                {firstName} {lastName}
              </p>
            ))}
          </div>
        );
      }}
    </GetAllUsersComponent>
  );
}
