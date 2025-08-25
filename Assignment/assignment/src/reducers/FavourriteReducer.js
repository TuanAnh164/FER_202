export const initialFavouriteState = {
  items: [],
};

export function favouriteReducer(state, action) {
  switch (action.type) {
    case "HYDRATE_FAVOURITES": {
      const items = action.payload || [];
      return { ...state, items };
    }

    case "ADD_FAVOURITE": {
      // tránh thêm trùng sản phẩm
      if (state.items.find((i) => i.id === action.payload.id)) {
        return state;
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE_FAVOURITE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    

    default:
      return state;
  }
}
