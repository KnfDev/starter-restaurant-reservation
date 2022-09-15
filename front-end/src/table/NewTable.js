import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListTablesComp from "../dashboard/ListTablesComp";


export default function NewTable() {
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [errors, setErrors] = useState(null);
  

  //v--This use state is for the handle change--v//
  const [newTable, setNewTable] = useState({
    table_name: "",
    capacity: "",
  });
  useEffect(loadTables, [])

  function loadTables() {
    const abortController = new AbortController();
    setErrors(null); //
    listTables(abortController.signal) //
      .then(setTables) //
      .catch(setErrors); //
    return () => abortController.abort();
  }
  console.log(tables)

  const handleChange = (event) => {
    //handles the input in the form html
    const { target } = event;
    const value = target.value;
    setNewTable({ ...newTable, [target.name]: value });
    // console.log("value",newTable, [target.name], value);
  };
  //^--One segment of code--^//

  const submitHandler = (event) => {
    event.preventDefault();
    newTable.capacity = Number(newTable.capacity);
    createTable(newTable) //a function in my utils folder
      //create call back to receive new table for id from create table
      .then((updatedTable) => {
        setTables([...tables, updatedTable]);
      })
      .then(() => history.push("/"))
      .catch(setErrors);
  };

  return (
    <div className="form-page">
      <div className="dashboard-header my-4 py-4">
        <h1>Create New Table</h1>
      </div>
      <div className="reservations-tables py-2">
        <form onSubmit={submitHandler}>
          <div>
            <input
              type="text"
              name="table_name"
              value={newTable.table_name}
              placeholder="table name"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              name="capacity"
              value={newTable.capacity}
              placeholder="capacity"
              onChange={handleChange}
            />
          </div>
          <ErrorAlert error={errors} />
          <button className="btn btn-secondary m-1" type="submit">
            Submit
          </button>
          <button
            className="btn btn-secondary m-1"
            onClick={() => {
              history.go("-1");
            }}
          >
            Cancel
          </button>
        </form>
      </div>
      <h2 className="dashboard-header my-4 py-4">Current Tables</h2>
      <div className="d-flex row justify-content-around">
      <ListTablesComp tables={tables}/>
      </div>
    </div>
  );
}
