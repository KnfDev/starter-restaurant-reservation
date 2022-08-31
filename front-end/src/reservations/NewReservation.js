import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createRes } from "../utils/api";

export default function NewReservation({setDate}) {
  const history = useHistory();
  const [tuesday, setTuesday] = useState(false)
  const [pastDate, setPastDate] = useState(false)
  const [pastTuesday, setPastTuesday] = useState(false)
  const [newReservation, setNewReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  // console.log(newReservation);


  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    setNewReservation({ ...newReservation, [target.name]: value });
    // console.log("value", [target.name], value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    newReservation.people = Number(newReservation.people); //to change string to number so that it fits the api criteria
    // console.log(newReservation.people);
    const day = new Date(newReservation.reservation_date)
    const dayOf = day.getUTCDay()
    const currentDate = new Date()
    if(dayOf === 2 && day < currentDate){
      setPastTuesday(true)
      return
    }
    if(dayOf === 2 ){
      setTuesday(true)
      return 
    }
    if( day < currentDate ){
      setPastDate(true)
      return
    }
    console.log(newReservation.reservation_date)
    createRes(newReservation)
    setDate(newReservation.reservation_date)
    history.push("/reservations");
    // console.log(newReservation.reservation_date);
    // console.log("called", newReservation);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <input
            name="first_name"
            value={newReservation.first_name}
            placeholder="First Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="last_name"
            value={newReservation.last_name}
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="string"
            name="mobile_number"
            value={newReservation.mobile_number}
            placeholder="Mobile Number"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="people"
            value={newReservation.people}
            placeholder="Party Size"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="reservation_date"
            type="date"
            value={newReservation.reservation_date}
            onChange={handleChange}
          />
        </div>
        {pastTuesday || tuesday? <p className="alert alert-danger">Tuesday is closed. Please make a reservation for a future date</p> : null}
        {pastDate ? <p className="alert alert-danger">Must be future date</p> : null}
        <div>
          <input
            type="time"
            name="reservation_time"
            value={newReservation.reservation_time}
            onChange={handleChange}
          />
        </div>
          <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => {
          history.go("-1");
        }}
      >
        Cancel
      </button>
    </>
  );
}
