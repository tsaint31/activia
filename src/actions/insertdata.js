export default function insertdata(price,store,satisfaction) {
  const input = {
    price:price,
    store:store,
    satisfaction:satisfaction
  };
  console.log(satisfaction);
  return fetch('/insertdata', {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
                },
               body: JSON.stringify(input)
             })
             .then(response => response.json())
             .then(data => {
               if (data.result === "success") {
                 return true;// dispatch a success
               } else {
                 console.warn(data);
                 return false;
               }
             });
}
