import React, { useState } from "react";
import "./index.scss";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import CustomForm from "../CustomForm";

const CustomModal = ({ modalType, setModalType }) => {
  const [show, setShow] = useState(modalType);
  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setModalType(null);
    }, 200);
  };

  useEffect(() => {
    if (modalType) {
      setShow(true);
    }
  }, [modalType]);

  const movieForm = [
    {
      label: "Name",
      fieldName: "name",
      type: "text",
      placeholder: "Enter movie name",
      required: true,
    },
    {
      label: "Release Date",
      fieldName: "releaseDate",
      type: "date",
      required: true,
    },
  ];

  const reviewForm = [
    {
      label: "Movie",
      type: "dropdown",
      fieldName: "movie",
      placeholder: "Select a movie",
      required: true,
    },
    {
      label: "Name",
      fieldName: "name",
      type: "text",
      placeholder: "Your name",
      required: false,
    },
    {
      label: "Rating",
      fieldName: "rating",
      type: "number",
      placeholder: "Rating out of 10",
      required: true,
      min: 0,
      max: 10,
    },
    {
      label: "Review Comments",
      fieldName: "reviewComment",
      type: "text",
      placeholder: "Type your review here",
      required: true,
      rows: 4,
    },
  ];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new {modalType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm formDetails={modalType == "movie" ? movieForm : reviewForm} formVariant={modalType} />
      </Modal.Body>
      {/* <Modal.Footer>
                <Button className="button primary-button" onClick={onSubmit}>
                    {modalType == 'movie'
                        ? 'Create Movie'
                        : modalType == 'review'
                        ? 'Add Review'
                        : null}
                </Button>
            </Modal.Footer> */}
    </Modal>
  );
};

export default CustomModal;
