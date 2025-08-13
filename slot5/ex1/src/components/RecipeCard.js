import React from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function RecipeCard({ recipe }) {
  const modalId = `modal-${
    recipe.id || recipe.title.replace(/\s+/g, "-").toLowerCase()
  }`;

  return (
    <Card className="h-100 shadow-sm text-center">
      <Card.Img
        style={{ objectFit: "cover", height: "200px" }}
        variant="top"
        src={recipe.image}
        alt={recipe.title}
      />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <div className="mb-2">
          <small>Servings: {recipe.servings}</small>
          <br />
          <small>Prep: {recipe.prep} mins</small>
          <br />
          <small>Cook: {recipe.cook} mins</small>
        </div>
        <Button
          variant="primary"
          data-bs-toggle="modal"
          data-bs-target={`#${modalId}`}
        >
          View Recipe
        </Button>
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
                  {recipe.title}
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
                  style={{ objectFit: "cover", height: "200px" }}
                  variant="top"
                  src={recipe.image}
                  alt={recipe.title}
                />
                <p>{recipe.description}</p>
                <ul>
                  <li>Servings: {recipe.servings}</li>
                  <li>Prep time: {recipe.prep} mins</li>
                  <li>Cook time: {recipe.cook} mins</li>
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
                <button type="button" className="btn btn-primary">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
