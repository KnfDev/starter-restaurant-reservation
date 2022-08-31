export default function ListResComp({ reservations }) {

  let list = reservations.map((reservation) => {
    return (
      <div key={reservation.reservation_id}>
        <p>
          <b>Guest Name</b> : {reservation.first_name} {reservation.last_name}
        </p>
        <p>
          <b>Party Size</b> : {reservation.people}
        </p>
        <p>
          <b>Contact</b> : {reservation.mobile_number}
        </p>
        <p>
          <b>Reservation Time</b> : {reservation.reservation_time}
        </p>
        <hr />
      </div>
    );
  });
  return (
    <>
      <div>
        {list}
        {/* {reservations.length === 0 ? list : "There are no reservations for this date"} */}
      </div>
    </>
  );
}
