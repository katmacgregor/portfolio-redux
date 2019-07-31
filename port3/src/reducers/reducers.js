import { combineReducers } from 'redux';
import update from 'immutability-helper';

function app(state = { theme: 'day' }, action) {
  switch(action.type) {
    case 'SET_THEME_SUCCESS':
      return update(state, { theme: { $set: action.theme } });
    default:
      return state;
  }
};

function portfolio(state = { items: [], active: null }, action) {
  switch(action.type) {
    case 'ITEMS_FETCH_SUCCESS':
      return update(state, { items: { $set: action.items } });
    case 'SET_DETAIL_ITEM':
      return update(state, { active: { $set: action.item } });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app,
  portfolio
});

export default rootReducer;
