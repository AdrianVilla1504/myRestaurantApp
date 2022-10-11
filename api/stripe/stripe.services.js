const calculateOrderAmount = (items) => {
let totalCost = 0;
  items[0].forEach((product)=>{
    totalCost += product.price*product.qty
  })


return totalCost*100;
}

module.exports = calculateOrderAmount;
