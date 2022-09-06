import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, updateTable } from "../utils/api";
// import ListTablesComp from "../dashboard/ListTablesComp"
export default function SeatComponent({tables, setTables, tablesError, setTablesError, reservations, date, currentRes}) {
  const history = useHistory();
  // console.log('seat component',tables, reservations, date, 'currentRes',currentRes)
  // const [tableStatus, setTableStatus] = useState({
  //   table_name: "",
  //   table_id: "",
  //   reservation_id: "",
  // });
  // console.log(tableStatus)
  const [tableId, setTableId] = useState(null)

  useEffect(loadTables, []);

  let params = useParams();
  let reservation_id = params.reservation_id;

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables)
    .catch(setTablesError);
    return () => abortController.abort();
  }

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    console.log("value", [target.name], value);
    // setTableStatus({ ...tableStatus, table_id: value });
    setTableId(value)
    // console.log("value", [target.name], value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    reservation_id = Number(reservation_id);
    updateTable(tableId, reservation_id)
      // .then(setTableStatus(tableStatus.reservation_id))
      .then(setTables(tables.map((table)=> table.table_id===Number(tableId) ? {...table, reservation_id} : table)))
      .then(setTableId(null))
      .then(history.push("/dashboard"))
      .catch(setTablesError);
  };

  const tablesForm = tables.map((table) => {
    // console.log("hello", table.reservation_id);
    return (
      <>
        <option key={table.table_id} value={table.table_id}>
          Table Name:{table.table_name}-Table Size:{table.capacity}
        </option>
      </>
    );
  });

  return (
    // <ListTablesComp tables={tables}/>
    <form onSubmit={submitHandler}>
      <select value={tableId} onChange={handleChange}>{tablesForm}</select>
      <button>Submit</button>
      <button type="button"
        onClick={() => history.goBack()}>
        Cancel
      </button>
        <ErrorAlert error={tablesError} />
    </form>
  );
}
