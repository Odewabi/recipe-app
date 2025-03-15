import React, { useState } from "react";

const AddRecipeForm = ({ onRecipeAdded }) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = { name, ingredients, instructions };

    try {
      const response = await fetch(
        "https://recipe-app-d5398-default-rtdb.firebaseio.com/recipes.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecipe),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add recipe.");
      }

      // Reset form
      setName("");
      setIngredients("");
      setInstructions("");

      // Notify parent to update recipe list
      if (onRecipeAdded) {
        onRecipeAdded();
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3>Add New Recipe</h3>
      <div className="mb-2">
        <label>Recipe Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>Ingredients:</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>Instructions:</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;