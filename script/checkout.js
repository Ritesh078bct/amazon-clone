import {cart, removeFromCart,updateDeliveryOption} from '../data/cart.js'
import { products } from '../data/products.js';
import { formatMoney } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

function renderOrderSummary(){

let checkoutHTML='';

cart.forEach((cartItem)=>{
    let matchingItem;
    products.forEach((product)=>{
        if(product.id===cartItem.id){
            matchingItem=product;
        }
        
    })
    let deliveryOption;
    const deliveryOptionId=cartItem.deliveryOptionsId;
    deliveryOptions.forEach((option)=>{
      if(option.id===deliveryOptionId){
        deliveryOption=option;
      }
    })
    console.log(deliveryOption);
     const today=dayjs();
     const delivertyDate=today.add(deliveryOption.deliveryDays,'days');
     const dateString=delivertyDate.format('dddd, MMMM D');

    checkoutHTML+=`
    <div class="cart-item-container 
    js-cart-item-container-${matchingItem.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingItem.image}">

      <div class="cart-item-details">
        <div class="product-name">
         ${matchingItem.name}
        </div>
        <div class="product-price">
          $ ${formatMoney(matchingItem.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary" id="update">
            Update
          </span>
          <span class="delete-quantity-link link-primary" id="delete" data-product-id="${matchingItem.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHtml(matchingItem,cartItem)}
        

      </div>
    </div>
  </div>`


    // console.log(matchingItem);

})


function deliveryOptionsHtml(matchingItem,cartItem){
let html='';
deliveryOptions.forEach((deliveryOption)=>{
  const today=dayjs();
  const deliverDate= today.add(deliveryOption.deliveryDays,'days');
  const dateString=deliverDate.format('dddd MMMM D');

  const priceString=deliveryOption.priceCents===0
  ?
    `FREE`:`$ ${formatMoney(deliveryOption.priceCents)} -`;

    const isChecked=deliveryOption.id===cartItem.deliveryOptionsId ? 'checked':'';
    html+=`
    <div class="delivery-option js-delivery-option" 
    data-product-id="${matchingItem.id}"
    data-delivery-option-id="${deliveryOption.id}">
    <input type="radio" ${isChecked}
    class="delivery-option-input"
    name="delivery-option-${matchingItem.id}">
    <div>
    <div class="delivery-option-date">
    ${dateString}
    </div>
    <div class="delivery-option-price">
    ${priceString} Shipping
    </div>
    </div>
    </div>`
  })

  return html;

  }



// console.log(checkoutHTML);

document.getElementById('order-list').innerHTML=checkoutHTML;


document.querySelectorAll('#delete')
.forEach((deleteButton)=>{
    let productId=deleteButton.dataset.productId
    deleteButton.addEventListener("click",()=>{


        removeFromCart(productId)

        const containerToBeDeleted=document.querySelector(`.js-cart-item-container-${productId}`);
        // console.log(containerToBeDeleted);
        containerToBeDeleted.remove();
    })
})

document.querySelectorAll('.js-delivery-option')
.forEach((element)=>{
  element.addEventListener("click",()=>{
//     const {productId, deliveryOptionId}=element.dataset;
const productId=element.dataset.productId
const deliveryOptionId=element.dataset.deliveryOptionId
 updateDeliveryOption(productId,deliveryOptionId);
 renderOrderSummary()
    // console.log(deliveryOptionId)
  })
})

}

renderOrderSummary();