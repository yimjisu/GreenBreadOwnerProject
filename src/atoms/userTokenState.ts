import { atom } from 'recoil';

const userTokenState = atom<string | null>({
  key: 'userTokenState', // unique ID (with respect to other atoms/selectors),
  default: {}, // default value (aka initial value)
});

export default userTokenState;
