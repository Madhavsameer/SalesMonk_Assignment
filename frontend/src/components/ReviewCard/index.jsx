import React, { useState, useContext } from "react";
import "./index.scss";
import { Icon } from "@iconify/react";
import { deleteReview } from "../../service/index";
import AppContext from "../../context";

const ReviewCard = ({ item }) => {
  const { reviewerName, reviewComment, rating, _id } = item;
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const { reviewData, setReviewData } = useContext(AppContext);

  const onDeleteReview = async () => {
    try {
      const response = await deleteReview(_id);
      if (response.status === 200) {
        setSuccess("Deleted Successfully");
      } else {
        setError("No review found! Please try again");
      }
    } catch (error) {
      setError("Internal server error! Please try again");
    }
  };
  return (
    <div className="review-card">
      <div className="col d-flex justify-content-between">
        <p>{reviewComment}</p>
        <h6 className="rating-color">{rating ?? "-"}/10</h6>
      </div>
      <p className="fst-italic fw-semibold">By {reviewerName ?? "Anonymous"}</p>
      <div className="d-flex row">
        {error ? <p className="col small text-danger">{error}</p> : null}
        {success ? <p className="col small text-success">{success}</p> : null}
        <div className="col d-flex justify-content-end">
          <a onClick={onDeleteReview}>
            <Icon icon={"material-symbols:delete-outline-rounded"} fontSize={20} className="icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
