import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListResComp from "./ListResComp";
import ListTablesComp from "./ListTablesComp";
import { today, next, previous } from "../utils/date-time";
import useQuery from "../utils/useQuery";//**
import { useHistory } from "react-router-dom"

function Dashboard() {

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const [tables, setTables] = useState([]);
  const query = useQuery();//**
  const date = query.get("date") || today();//**
 
  const history = useHistory()

  useEffect(loadDashboard, [date]);
  function loadDashboard() { //needs to be renamed to loadReservations
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
    .then(setReservations)
    .catch(setReservationsError);
    return () => abortController.abort();
  }
  
  useEffect(loadTables, []);
  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);//
    listTables(abortController.signal)//
    .then(setTables)//
    .catch(setTablesError);//
    return () => abortController.abort();
  }

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
          loadDashboard={loadDashboard}
           />
        ) : (
          `There are no reservations today`
        )}
      </div>
      <button onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
      <button onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
      <button onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
      <ErrorAlert error={reservationsError} />
      <hr/>
      <ListTablesComp tables={tables} loadTables={loadTables} loadDashboard={loadDashboard} />
      <ErrorAlert error={tablesError} />
    </main>
  );
}

export default Dashboard;
