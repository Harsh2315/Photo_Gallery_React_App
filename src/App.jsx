import { useReducer, useEffect } from "react";
import Gallery from "./components/Gallery";

function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      const targetId = String(action.payload);
      return state.map(String).includes(targetId)
        ? state.filter((id) => String(id) !== targetId)
        : [...state, targetId];
    default:
      return state;
  }
}

const getInitialState = () => {
  try {
    const savedFavs = localStorage.getItem("gallery_favourites");
    return savedFavs ? JSON.parse(savedFavs) : [];
  } catch (error) {
    return [];
  }
};

export default function App() {
  const [favourites, dispatch] = useReducer(favouritesReducer, [], getInitialState);

  useEffect(() => {
    localStorage.setItem("gallery_favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <div>
      <h1 style={{textAlign: 'center', fontFamily: 'sans-serif', margin: '20px 0'}}>
        Photo Gallery ({favourites.length} Favourites)
      </h1>
      <Gallery favourites={favourites} dispatch={dispatch} />
    </div>
  );
}