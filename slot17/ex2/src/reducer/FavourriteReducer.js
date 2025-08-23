export const initialFavouriteState = {
  items: [],
};
export function favouriteReducer(state, action) {
    switch (action.type) {
        case "ADD_FAVOURITE":
            return { ...state, items: [...state.items, action.payload] };
        case "REMOVE_FAVOURITE":
            return { ...state, items: state.items.filter(item => item.id !== action.payload) };
        default:
            return state;
    }
}
