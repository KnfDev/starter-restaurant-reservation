export default function ListResComp({ reservations }) {
  let list = reservations.map((reservation) => {
    return (
      <div>
        <p><b>Guest Name</b> : {reservation.first_name} {reservation.last_name}</p>
        <p><b>Party Size</b> : {reservation.people}</p>
        <p><b>Contact</b> : {reservation.mobile_number}</p>
        <p><b>Reservation Time</b> : {reservation.reservation_time}</p>
        <hr/>
      </div>
    );
  });
  return <>{list}</>;
}
