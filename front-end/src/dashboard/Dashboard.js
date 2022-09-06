// import React, { useEffect, useState } from "react";
// import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListResComp from "./ListResComp";
import ListTablesComp from "./ListTablesComp";
import { today, next, previous } from "../utils/date-time";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ reservations, tables, currentRes, setCurrentRes, date, setDate, reservationsError, tablesError }) {

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <hr />
      <div>
        {reservations.length !== 0 ? (
          <ListResComp 
          reservations={reservations}
          currentRes={currentRes}
          setCurrentRes={setCurrentRes}
           />
        ) : (
          `There are no reservations today`
        )}
      </div>
      <button onClick={() => setDate(previous(date))}>Previous</button>
      <button onClick={() => setDate(today())}>Today</button>
      <button onClick={() => setDate(next(date))}>Next</button>
      <ErrorAlert error={reservationsError} />
      <hr/>
      <ListTablesComp tables={tables}/>
      <ErrorAlert error={tablesError} />
    </main>
  );
}

export default Dashboard;
