import { useHistory } from "react-router"
import { updateResId } from "../utils/api"

export default function ListTablesComp ({ tables }) {
  const history = useHistory()

  function clickHandler(event){
    let tableId = event.target.value
    tableId = Number(tableId)
    console.log(event.target.value)
    if(window.confirm("Is this table ready to seat new guests?")===true){
      updateResId(tableId)
      .then(()=>history.go(0))
      .catch(error=>console.log('error',error))
    }
  }

  const list = tables.map((table)=> {
    return (
      <div key={table.table_id}>
      <p><b>Table Name: </b>{table.table_name}</p>
      <p><b>Table ID:</b> {table.table_id}</p>
      <p><b>Table Capacity: </b>{table.capacity}</p>
      <p><b>Is Reserved: </b><span data-table-id-status={table.table_id}>{table.reservation_id ? `Occupied` : `Free`}</span></p>
      {table.reservation_id ? <button value={table.table_id} data-table-id-finish={table.table_id} onClick={clickHandler}>Finish</button> : null}
      <hr/>
      </div>
    )
  }) 
  return (
    <>
    {list}
    </>
  )
}