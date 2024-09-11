import React from 'react';
import { ViewTask } from './AddTask/ViewTask';

export const Final = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center mb-4">
          <div className="col text-center">
            <h2>Task Management</h2>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <ViewTask />
          </div>
        </div>
      </div>
    </>
  );
};
