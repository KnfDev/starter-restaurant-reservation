import { useEffect, useState } from "react";
import { listTables } from "../utils/api";
// import ListTablesComp from "../dashboard/ListTablesComp"
export default function SeatComponent() {
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)
  useEffect(loadTables, []);
  // console.log(date)

  function loadTables() {
    const abortController = new AbortController();


    setTablesError(null)
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError)
    return () => abortController.abort();
  }

const tablesForm = tables.map((table)=> {
  return <>
  <div>

  <label for="table_number">Table Number: {table.table_id}</label>
  <select id={`${table.table_id}`} name={`${table.table_name}`}>
    <option>Table Name:{table.table_name}-Table Size:{table.capacity}</option>
  </select>
  </div>
  </>
})

  return (
    // <ListTablesComp tables={tables}/>
    <form>
      {/* <label for="table_name">Table Number:</label>
      <select id="table_id" name="table_name">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select> */}
      {tablesForm}
    </form>
  );
}
