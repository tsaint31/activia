export default function getPrices(state){
  return{
    prices: state.pricesReducer.prices,
  }
}
