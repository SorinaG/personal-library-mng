import React, { useState } from "react";

export default function Rating(props) {
  const [rating, setRating] = useState(props.value ?? 0);

  function setRatingValue(index) {
    // newRating => for the first star, gonna be 1
    if(props.readOnly) {
      return;
    }
    const newRating = index + 1;
    const updatedRating = newRating === rating ? 0 : newRating;
    setRating(updatedRating);
    props.onChange(updatedRating);
  }

  const setStarClassname = (index) =>
    index < props.value ? "bx bxs-star" : "bx bx-star";

  return (
    <div>
      <h3>
        Rating
        {[1, 2, 3, 4, 5].map((_, index) => {
          return (
            <i
              className={`${setStarClassname(index)} align-text-bottom`}
              key={index}
              onClick={() => setRatingValue(index)}
            ></i>
          );
        })}
      </h3>
    </div>
  );
}
