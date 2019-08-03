import { combineReducers } from 'redux';
import update from 'immutability-helper';

function app(state = { loaded: false, theme: 'day', bgFixed: false }, action) {
  switch(action.type) {
    case 'APP_LOADED_SUCCESS':
      return update(state, { loaded: { $set: true } });
    case 'SET_THEME_SUCCESS':
      return update(state, { theme: { $set: action.theme } });
    case 'SET_BG_FIXED':
      return update(state, { bgFixed: { $set: action.fixed } });
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
