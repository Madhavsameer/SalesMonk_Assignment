import React, { useState, useEffect, useContext } from "react";
import Searchbar from "../../components/SearchBar";
import ReviewCard from "../../components/ReviewCard";
import "./index.scss";
import { getMovieReviews } from "../../service";
import { useParams } from "react-router-dom";
import AppContext from "../../context";

const Review = () => {
  const { id } = useParams();
  const { reviewData, setReviewData } = useContext(AppContext);

  const fetchReviewData = async () => {
    try {
      const response = await getMovieReviews(id);
      setReviewData(response?.data);
    } catch (error) {
      //setError('Internal server error! Please refresh')
    }
  };

  useEffect(() => {
    fetchReviewData();
  }, []);

  return (
    <div>
      <div className="p-3 d-flex justify-content-between">
        <h2 className="p-4">{reviewData?.movie?.name}</h2>
        <h2 className="p-4 rating-color">{reviewData?.movie?.averageRating ? Number(reviewData?.movie?.averageRating).toFixed(2) : "-"}/10</h2>
      </div>
      <div className="review-cards-container">
        {reviewData?.reviews?.map((item, index) => (
          <ReviewCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Review;
