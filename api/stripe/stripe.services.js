const calculateOrderAmount = (items) => {
/* const itemsParsed = JSON.parse(items);
console.log(itemsParsed); */
let totalCost = 0;

  items[0].forEach((product)=>{
   console.log("cantidad hugo",product.qty);
    totalCost += product.price*product.qty
    console.log("kart", totalCost)
  })
  console.log("el costico a pagar papalindo =>", totalCost)
  console.log("carrito en el back de stripe", items)

return totalCost*100;
}

module.exports = calculateOrderAmount;
