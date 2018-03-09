import { createStore, combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import pricesReducer from "./price/reducers";

let reducers = combineReducers({
  form: formReducer,
  pricesReducer: pricesReducer
});

export const store = createStore(reducers);
