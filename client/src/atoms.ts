import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userAuthTokenState = atom<string | null>({
  key: 'userAuthToken',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

export const userInfoState = atom<{ name: string | null } | null>({
  key: 'userInfo',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

export const isAuthState = selector({
  key: 'isAuth',
  get: ({ get }) => {
    return !!get(userAuthTokenState);
  }
});
