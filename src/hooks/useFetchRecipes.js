import { useEffect, useState } from "react";

const useFetchRecipes = (refresh) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          "https://recipe-app-d5398-default-rtdb.firebaseio.com/recipes.json"
        );
        const data = await response.json();

        if (data) {
          const loadedRecipes = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setRecipes(loadedRecipes);
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [refresh]);

  return { recipes, loading };
};

export default useFetchRecipes;
