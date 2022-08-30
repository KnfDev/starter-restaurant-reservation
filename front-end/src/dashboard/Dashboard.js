import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListResComp from "./ListResComp";
import { today, next, previous } from "../utils/date-time";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(today())
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
        <hr/>
      <ListResComp reservations={reservations}/>
      <button onClick={()=>setDate(previous(date))}>Previous</button>
      <button onClick={()=>setDate(today())}>Today</button>
      <button onClick={()=>setDate(next(date))}>Next</button>
      <ErrorAlert error={reservationsError} />
    
    </main>
  );
}

export default Dashboard;
