export const favouriteReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      const exists=state.find((photo)=>photo.id===action.payload);
      if (state.includes(action.payload)) {
        return state.filter((id) => id !== action.payload);
      }

      return [...state, action.payload];

    default:
      return state;
  }
};