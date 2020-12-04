/**=====================ACTION TYPES========================== */
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  UPDATE_ITEM,
  MARK_AS_COMPLETED,
} from './types';

//-------------------SERVER ACTIONS --------------------------------------

/**==================== ACTION S===================================== */
export const getItems = (data) => (dispatch) => {
  dispatch(setItemsLoading());
  dispatch({
    type: GET_ITEMS,
    payload: data,
  });
};

export const addItem = (item) => (dispatch, getState) => {
  dispatch({
    type: ADD_ITEM,
    payload: item,
  });
};

export const updateItem = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_ITEM,
    payload: data,
  });
};
export const deleteItem = (id) => (dispatch, getState) => {
  console.log(id);
  dispatch({
    type: DELETE_ITEM,
    payload: id,
  });
};

export const markAsCompleted = (data) => (dispatch) => {
  dispatch({
    type: MARK_AS_COMPLETED,
    payload: data,
  });
};
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
