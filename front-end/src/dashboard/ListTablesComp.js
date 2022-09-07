import { useHistory, useParams } from "react-router"
import { updateResId } from "../utils/api"

export default function ListTablesComp ({ tables }) {
  const history = useHistory()
  let params = useParams()
  let tableId = params.table_id

  function clickHandler(){
    if(window.confirm(`Is this table ready to seat new guests? This cannot be undone.`)===true){
      window.alert(`you clicked okay`)
      tableId = Number(tableId)
      updateResId(tableId)
      .then(()=>history.push("/dashboard"))
      .catch(error=>console.log('error',error))
    } else {
      window.alert(`you clicked cancel`)
    }
  }

  const list = tables.map((table)=> {
    return (
      <div key={table.table_id}>
      <p><b>Table Name: </b>{table.table_name}</p>
      <p><b>Table Capacity: </b>{table.capacity}</p>
      <p><b>Is Reserved: </b><span data-table-id-status={table.table_id}>{table.reservation_id ? `occupied` : `Free`}</span></p>
      {table.reservation_id ? <button data-table-id-finish={table.table_id} onClick={clickHandler}>Finish</button> : null}
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