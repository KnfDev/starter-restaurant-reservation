export default function ListTablesComp ({ tables }) {
  const list = tables.map((table)=> {
    return (
      <div key={table.table_id}>
      <p><b>Table Name: </b>{table.table_name}</p>
      <p><b>Table Capacity: </b>{table.capacity}</p>
      <p><b>Is Reserved: </b>{table.reservation_id ? `Occupied ${table.reservation_id}` : `Free`}</p>
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