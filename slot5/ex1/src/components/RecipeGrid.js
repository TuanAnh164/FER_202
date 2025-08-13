import React, { useState } from "react";
import { Row, Col, Pagination, Form } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

function RecipeGrid({ recipes }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Form.Select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          style={{ width: "150px" }}
        >
          <option value={6}>6 per page</option>
          <option value={9}>9 per page</option>
          <option value={12}>12 per page</option>
        </Form.Select>
      </div>

      <Row>
        {currentRecipes.length > 0 ? (
          currentRecipes.map((recipe, index) => (
            <Col md={4} className="mb-4" key={index}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))
        ) : (
          <p className="text-center">No results found</p>
        )}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </>
  );
}

export default RecipeGrid;
