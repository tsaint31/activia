export default function insertdata(price,store) {
  const input = {
    price:price,
    store:store,
  };
  console.log("hello2");
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
