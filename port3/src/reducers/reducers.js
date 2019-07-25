import { combineReducers } from 'redux';
import update from 'immutability-helper';

// function app(state = { active: null }, action) {
//   switch(action.type) {
//     // case '':
//       // return update(state, { page: { $set: action.page } });
//     default:
//       return state;
//   }
// };

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
  // app,
  portfolio
});

export default rootReducer;
