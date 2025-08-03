import { useEffect, useState } from "react";
import RecipeItems from "./API";

export const useRecipeSearch = (query) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const filtered = RecipeItems.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query]);

  return results;
};
