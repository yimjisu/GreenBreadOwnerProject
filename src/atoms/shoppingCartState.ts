import { atom } from 'recoil';

export const productListInCartState = atom({
  key: 'shoppingCartState', // unique ID (with respect to other atoms/selectors),
  default: new Map(), // default value (aka initial value)
});

export const storeInCartState = atom({
  key: 'storeInCartState',
  default: null,
})