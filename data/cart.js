export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){

  cart=[
      {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity:3,
          deliveryOptionsId:'1'
      },
      {
          id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          quantity:1,
          deliveryOptionsId:'2'
      },
  ]
}


function saveToLocalStorage()
{
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId) {
    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.id) {
        matchingItem = item;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        quantity: 1,
        deliveryOptionsId:'1'
      });
    }
    saveToLocalStorage();
  }


  export function removeFromCart(productId){
    let newCart=[];
    cart.forEach((cartProduct)=>{
        if(cartProduct.id!=productId){
            newCart.push(cartProduct)
        }
    })
    cart=newCart;

    console.log(cart.length);
    if(cart.length==0){
        console.log("empty")
    }else{

        console.log(cart);
    }
   saveToLocalStorage();
  }