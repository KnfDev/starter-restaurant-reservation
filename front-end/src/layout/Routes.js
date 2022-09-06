import { React, useState, useEffect } from "react";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../reservations/NewReservation";
import NewTable from "../table/NewTable";
import SeatComponent from "../table/SeatComponent";
import useQuery from "../utils/useQuery";
import { listReservations, listTables } from "../utils/api";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const [tables, setTables] = useState([]);
  const query = useQuery();
  const date2 = query.get("date");
  const [date, setDate] = useState(date2 ? date2 : today());
  const [currentRes, setCurrentRes] = useState()
  // const params = useParams()
  console.log('errors', reservationsError, tablesError)
  // console.log('routes',currentRes,date,params)
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
  
  useEffect(loadTables, []);
  
  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
    .then(setTables)
    .catch(setTablesError);
    return () => abortController.abort();
  }
  
  // if(reservations.length===0 || tables.length===0){
  //   return "loading"
  // }
  // console.log("date2", date2, "date", date);
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        {/* <Redirect to={"/dashboard"} /> */}
      </Route>
      <Route path="/dashboard">
        {/* {date2? <Dashboard date={date2} setDate={setDate}/> : <Dashboard date={date} setDate={setDate}/>} */}
        <Dashboard
          date={date}
          setDate={setDate}
          reservations={reservations}
          tables={tables}
          currentRes={currentRes}
          setCurrentRes={setCurrentRes}
          reservationsError={reservationsError}
          tablesError={tablesError}
        />
      </Route>
      <Route path="/reservations/new">
        <NewReservation date={date} setDate={setDate} />
      </Route>
      <Route path="/tables/new">
        <NewTable tables={tables} setTables={setTables}/>
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatComponent
          tables={tables}
          date={date}
          setTables={setTables}
          reservations={reservations}
          setTablesError={setTablesError}
          tablesError={tablesError}
        />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
