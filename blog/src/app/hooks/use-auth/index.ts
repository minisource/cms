import { authAtom } from "atoms";
import { useRecoilState, useResetRecoilState } from "recoil";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const reset = useResetRecoilState(authAtom);

  return {
    ...auth,
    auth,
    setAuth,
    reset,
  };
};
