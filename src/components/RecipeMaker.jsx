import { useState } from "react";
import { useDebounce } from "./UseDebounceHook";
import { useRecipeSearch } from "./UseRecipeSearch";

import {
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const RecipeMaker = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const debouncedSearch = useDebounce(search, 400);
  const results = useRecipeSearch(debouncedSearch);

  const handleFavorite = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        🍲 Recipe Finder
      </Typography>

      <TextField
        label="Search Recipe"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Typography variant="h6">Search Results</Typography>
      <Paper variant="outlined">
        <List>
          {results.length ? (
            results.map((recipe) => (
              <div key={recipe.id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleFavorite(recipe)}
                    >
                      <FavoriteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText primary={recipe.name} />
                  <ListItemText primary={recipe.description} />
                  <ListItemText primary={recipe.price} />
                </ListItem>
                <Divider />
              </div>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No results found" />
            </ListItem>
          )}
        </List>
      </Paper>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Favorites
      </Typography>

      <Paper variant="outilined">
        <List>
          {favorites.length ? (
            favorites.map((fav) => (
              <div key={fav.id}>
                <ListItem>
                  <ListItemText primary={fav.name} />
                  <ListItemText primary={fav.description} />
                  <ListItemText primary={fav.price} />
                </ListItem>
              </div>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No favorites added." />
            </ListItem>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default RecipeMaker;
