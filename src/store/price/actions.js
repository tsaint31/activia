export default function pricesActions(dispatch){
  return {
    retrievePrices: () => {
      console.log("retrieve")
      return fetch('/viewpricesall', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
          console.log("data",data)
          dispatch({ type: "RETRIEVE_PRICES", data: data })
        });
    }
  }
}
