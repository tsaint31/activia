let initialState={
    prices: []
};

export default function pricesReducer(state=initialState, action){
  switch(action.type){
    case "RETRIEVE_PRICES":
      return{
        ...state,
        prices:action.data
      }
    default:
      return state;
  }
}
