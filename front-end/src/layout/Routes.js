import {React, useState} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../reservations/NewReservation"
import NewTable from "../table/NewTable";
import SeatComponent from "../table/SeatComponent";
import useQuery from "../utils/useQuery";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const [date, setDate] = useState(today())
  const date2 = query.get('date')
  console.log('date',date2)
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        {date2? <Dashboard date={date2} setDate={setDate}/> :<Dashboard date={date} setDate={setDate}/>}
        {/* <Dashboard date={today()} /> */}
      </Route>
      <Route path="/reservations/new">
        <NewReservation date={date} setDate={setDate}/>
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route>
        <SeatComponent path="/reservations/:reservation_id/seat"/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
