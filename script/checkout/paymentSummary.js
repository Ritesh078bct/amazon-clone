import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatMoney } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.id);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalPriceBeforTax = productPriceCents + shippingPriceCents;
  const taxCents = 0.1 * totalPriceBeforTax;
  const totalPriceCents = totalPriceBeforTax + taxCents;
  // console.log(productPriceCents);
  // console.log(shippingPriceCents)

  let paymentSummaryHtml = `

                <div class="payment-summary-title">
                Order Summary
                </div>

                <div class="payment-summary-row">
                <div>Items (3):</div>
                <div class="payment-summary-money">$${formatMoney(productPriceCents)}</div>
                </div>

                <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatMoney(shippingPriceCents)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatMoney(totalPriceBeforTax)}</div>
                </div>

                <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatMoney(taxCents)}</div>
                </div>

                <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatMoney(totalPriceCents)}</div>
                </div>
                <button class="place-order-button button-primary">
                Place your order
              </button>
        `;

        document.querySelector(".js-payment-summary").innerHTML=paymentSummaryHtml;
}
