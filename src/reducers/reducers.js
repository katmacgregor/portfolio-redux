import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import update from 'immutability-helper';

function app(state = { loaded: false, device: 'desktop', theme: 'day', bgFixed: false }, action) {
  switch(action.type) {
    case 'APP_LOADED_SUCCESS':
      return update(state, { loaded: { $set: true } });
    case 'DEVICE_DETECT_SUCCESS':
      return update(state, { device: { $set: action.device } });
    case 'SET_THEME_SUCCESS':
      return update(state, { theme: { $set: action.theme } });
    case 'SET_BG_FIXED':
      return update(state, { bgFixed: { $set: action.fixed } });
    default:
      return state;
  }
};

function portfolio(state = { items: [], active: null, itemChanging: false }, action) {
  switch(action.type) {
    case 'ITEMS_FETCH_SUCCESS':
      return update(state, { items: { $set: action.items } });
    case 'SET_DETAIL_ITEM':
      return update(state, {
        active: { $set: action.item },
        itemChanging: { $set: false }
      });
    case 'ITEM_CHANGING':
      return update(state, { itemChanging: { $set: true } });
    default:
      return state;
  }
};

export default (history) => combineReducers({
  router: connectRouter(history),
  app,
  portfolio
});
