export const cart=[]


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
      });
    }
  }