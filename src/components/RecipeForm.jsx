import React, { useState } from 'react';
import usePostRecipe from '../hooks/usePostRecipe';

const RecipeForm = () => {
  const { addRecipe, loading } = usePostRecipe();
  const [recipe, setRecipe] = useState({ name: '', ingredients: '', instructions: '' });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipe.name || !recipe.ingredients || !recipe.instructions) return alert('All fields required!');

    await addRecipe(recipe);
    alert('Recipe added!');
    setRecipe({ name: '', ingredients: '', instructions: '' });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="border p-3 shadow-sm">
        <input className="form-control mb-2" type="text" name="name" placeholder="Recipe Name" value={recipe.name} onChange={handleChange} />
        <textarea className="form-control mb-2" name="ingredients" placeholder="Ingredients" value={recipe.ingredients} onChange={handleChange} />
        <textarea className="form-control mb-2" name="instructions" placeholder="Instructions" value={recipe.instructions} onChange={handleChange} />
        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
