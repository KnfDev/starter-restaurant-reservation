import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListResComp from "./ListResComp";
import { today, next, previous } from "../utils/date-time";
// import useQuery from "../utils/useQuery";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);
  // console.log(date)

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  console.log(reservations);

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
    </main>
  );
}

export default Dashboard;
