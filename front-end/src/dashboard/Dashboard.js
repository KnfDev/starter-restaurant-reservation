import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
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

function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tablesError, setTablesError] = useState(null);
  const [tables, setTables] = useState([])

  useEffect(loadDashboard, [date]);
  // console.log(date)

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    setTablesError(null)
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError)
    return () => abortController.abort();
  }
  // console.log(tables)
  // console.log('hello',reservations);

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <hr />
      <div>
        {reservations.length !== 0 ? (
          <ListResComp reservations={reservations} />
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
