import React from "react";
import { Row, Col } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

function RecipeGrid({ recipes }) {
  return (
    <Row>
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <Col md={4} className="mb-4" key={index}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))
      ) : (
        <p className="text-center">No results found</p>
      )}
    </Row>
  );
}

export default RecipeGrid;
