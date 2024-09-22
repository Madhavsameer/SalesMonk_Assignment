import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import moment from "moment";
import { Icon } from "@iconify/react";
import { deleteMovie } from "../../service/index";

const MovieCard = ({ item }) => {
  const { name, releaseDate, averageRating, _id } = item;
  const navigate = useNavigate();
  const date = moment(releaseDate).format("Do MMMM YYYY");
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const onDeleteMovie = async () => {
    try {
      const response = await deleteMovie(_id);
      if (response.status === 200) {
        setSuccess("Deleted Successfully");
      } else {
        setError("No review found! Please try again");
      }
    } catch (error) {
      setError("Internal server error! Please try again");
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  }, [error, success]);

  return (
    
    <div className="card-container" onClick={() => navigate(`reviews/${_id}`)}>
      
      <h5>{name}</h5>
      <h6 className="fst-italic">Released: {date}</h6>
      <h6 className="fw-bold">Rating: {averageRating ? Number(averageRating).toFixed(2) : "-"}</h6>
      {error ? <p className="small text-danger">{error}</p> : null}
      {success ? <p className="small text-success">{success}</p> : null}
      <div className="d-flex justify-content-end">
        <a onClick={() => navigate(`reviews/${_id}`)}>
          <Icon icon={"material-symbols:edit-outline-rounded"} fontSize={20} className="icon" />
        </a>
        <a onClick={onDeleteMovie}>
          <Icon icon={"material-symbols:delete-outline-rounded"} fontSize={20} className="icon" />
        </a>
      </div>
    </div>
  );
};

export default MovieCard;
