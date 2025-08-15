// MovieCard.js
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Toast } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function MovieCard({ movie, isFavourite, onToggleFavourite }) {
  const modalId = `modal-${movie.id || movie.title.replace(/\s+/g, "-").toLowerCase()}`;
  const toastRef = useRef(null);

  const showToast = () => {
    const toastElement = toastRef.current;
    const bsToast = new Toast(toastElement, { delay: 2000, autohide: true });
    bsToast.show();
  };

  return (
    <Card className="h-100 shadow-sm text-center">
      <Card.Img
        style={{ objectFit: "cover", height: "600px" }}
        variant="top"
        src={movie.poster}
        alt={movie.title}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <div className="mb-2">
          <small>Year: {movie.year}</small>
          <br />
          <small>Country: {movie.country}</small>
          <br />
          <small>Duration: {movie.duration} mins</small>
          <br />
          <small>Genre: {movie.genre}</small>
        </div>
        <Button
          className="rounded-pill"
          variant="primary"
          data-bs-toggle="modal"
          data-bs-target={`#${modalId}`}
        >
          Details
        </Button>
        <Button
          className="rounded-pill ms-2"
          variant={isFavourite ? "danger" : "secondary"}
          onClick={() => {
            onToggleFavourite(movie.id);
            showToast();
          }}
        >
          {isFavourite ? "Remove from Favourites" : "Add to Favourites♡"}
        </Button>

        {/* Modal */}
        <div
          className="modal fade"
          id={modalId}
          tabIndex="-1"
          aria-labelledby={`${modalId}-label`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${modalId}-label`}>
                  {movie.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Card.Img
                  style={{ objectFit: "cover", height: "600px" }}
                  variant="top"
                  src={movie.poster}
                  alt={movie.title}
                />
                <p>{movie.description}</p>
                <ul>
                  <small>Year: {movie.year}</small>
                  <br />
                  <small>Country: {movie.country}</small>
                  <br />
                  <small>Duration: {movie.duration} mins</small>
                  <br />
                  <small>Genre: {movie.genre}</small>
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            ref={toastRef}
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body">
              {isFavourite ? "Removed from favourites." : "Added to favourites."}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  onToggleFavourite: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired,
};

export default MovieCard;
