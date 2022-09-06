export default function ListTablesComp ({ tables }) {
  const list = tables.map((table)=> {
    return (
      <div key={table.table_id}>
      <p><b>Table Name: </b>{table.table_name}</p>
      <p><b>Table Capacity: </b>{table.capacity}</p>
      <p><b>Is Reserved: </b><span data-table-id-status={table.table_id}>{table.reservation_id ? `occupied` : `Free`}</span></p>

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