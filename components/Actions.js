export const ADD_BOOKMARK = bookmark => ({
  type: "ADD_BOOKMARK",
  item: bookmark
});

export const DELETE_BOOKMARK = index => ({
  type: "DELETE_BOOKMARK",
  index: index
});

export const CURRENT_DETAIL = (detail = false) => ({
  type: "CURRENT_DETAIL",
  item: detail
});

export const SET_INDEX = index => ({
  type: "SET_INDEX",
  item: index
});
export default Actions;
