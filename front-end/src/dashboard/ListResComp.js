
export default function ListResComp({ reservations }) {
  let list = reservations.map((reservation) => {
    let {reservation_id, last_name, first_name, people, mobile_number, status, reservation_time, reservation_date} = reservation
    return (
      <div key={reservation.reservation_id}>
        <p>
          <b>Reservation Date</b> : {reservation_date}
        </p>
        <p>
          <b>Guest Name</b> : {first_name} {last_name}
        </p>
        <p>
          <b>Party Size</b> : {people}
        </p>
        <p>
          <b>Contact</b> : {mobile_number}
        </p>
        <p>
          <b>Reservation Time</b> : {reservation_time}
        </p>
        <p>
          <b>Reservation ID</b>: {reservation_id}
        </p>
        <p data-reservation-id-status={reservation_id}>
          <b>Reservation Status</b>: {status}
        </p>
        { status!=='seated' ? <a href={`/reservations/${reservation_id}/seat`}><button>Seat</button></a> : null }
        <hr />
      </div>
    );
  });
  return (
    <>
      <div>
        {list}
      </div>
    </>
  );
}
