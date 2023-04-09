import react, { useEffect, useRef, useState } from "react";

function CountdownDate(props) {
  const countdownDate = new Date(props.date).getTime();

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [seconds, setSeconds] = useState(0);

  let interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMins(mins);
      setSeconds(seconds);

      if (distance < 0) {
        clearInterval(interval.current);
      }
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, [countdownDate]);

  return (
    <div className="calculated-date">
      <span>{days}</span> d <span>{hours}</span> h <span>{mins}</span> min{" "}
      <span>{seconds}</span> sec
    </div>
  );
}

export default CountdownDate;
