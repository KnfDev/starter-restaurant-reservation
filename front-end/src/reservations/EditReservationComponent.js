import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import FormComponent from "../formComponent/FormComponent";
import { updateRes, editRes } from "../utils/api";

export default function EditReservationsComponent() {
  const params = useParams();
  const history = useHistory();
  const [newReservation, setNewReservation] = useState([]); //current
  const [errors, setErrors] = useState(null);

  useEffect(loadDashboard, [params.reservation_id]);
  // console.log('test',reservation)

  function loadDashboard() {
    const abortController = new AbortController();
    setErrors(null);
    editRes(params.reservation_id, abortController.signal)
      .then(setNewReservation)
      .catch(setErrors);
    return () => abortController.abort();
  }

  // console.log('editResComp',newReservation)
  // console.log('newres',newReservation)
  // console.log(reservation)
  
  const submitHandler = (event, newReservation) => {
    // console.log(event)
    event.preventDefault();
    newReservation.people = Number(newReservation.people);
    // console.log('line52',params.reservation_id)
    updateRes(newReservation, params.reservation_id)
      .then(()=>history.push(`/dashboard/?date=${newReservation.reservation_date}`))
      // .catch(setErrors);
      .catch((errors)=>console.log('string',errors))
  };

  return (
    <FormComponent
      submitHandler={submitHandler}
      // handleChange={handleChange}
      // newReservation={reservation}
      newReservation={newReservation}
      errors={errors}
    />
  );
}
