import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import useFetchRecipes from "../hooks/useFetchRecipes";
import AddRecipeForm from "./AddRecipeForm";

const RecipeList = () => {
  const [refresh, setRefresh] = useState(false);
  const { recipes, loading } = useFetchRecipes(refresh);

  const handleRecipeAdded = () => {
    setRefresh((prev) => !prev); // Toggle refresh to trigger re-fetch
  };

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  return (
    <Container>

      <AddRecipeForm onRecipeAdded={handleRecipeAdded} />

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <Row>
          {recipes.map((recipe) => (
            <Col key={recipe.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Text>
                    <strong>Ingredients:</strong> {recipe.ingredients}
                  </Card.Text>
                  <Card.Text>
                    <strong>Instructions:</strong> {recipe.instructions}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default RecipeList;
