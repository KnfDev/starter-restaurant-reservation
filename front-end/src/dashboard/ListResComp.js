import { useState } from "react";
import { useHistory } from "react-router";
import { updateResStatus } from "../utils/api"

export default function ListResComp({ reservations }) {
  const [currentRes, setCurrentRes] = useState()
  const history = useHistory()

  function onCancel(e,reservation){
    e.preventDefault()
    if(window.confirm("Do you want to cancel this reservation?")){
      // setCurrentRes(reservation.reservation_id)
      // console.log('cancelbutton res',currentRes)
      updateResStatus(reservation.reservation_id)
      // .then(()=>history.push(`/dashboard?date=${reservation.reservation_date}`))
      .then(()=>history.go(0))
    }
  }

  let list = reservations.map((reservation) => {
  // filter((reservation)=>reservation.status!=='cancelled').


    // console.log('newList',newlist)
    // setCurrentRes(reservation)
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
        <a href={`/reservations/${reservation_id}/edit`}>
        <button>Edit</button>
        </a>
        <button data-reservation-id-cancel={reservation.reservation_id} onClick={(e)=>onCancel(e,reservation)}>Cancel</button>
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
