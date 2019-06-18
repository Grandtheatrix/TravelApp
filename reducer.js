const initialState = { bookmarks: [], placeid: false };

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_DETAIL":
      return { ...state, place_id: action.item };
    case "SET_INDEX":
      return { ...state, index: action.item };
    case "ADD_BOOKMARK":
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.item]
      };

    case "DELETE_BOOKMARK":
      return {
        ...state,
        bookmarks: [
          ...state.bookmarks.slice(0, action.index),
          ...state.bookmarks.slice(action.index + 1)
        ]
      };
    default:
      return state;
  }
};

export default Reducer;
