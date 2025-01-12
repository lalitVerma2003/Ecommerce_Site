import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { logOut } from "../store/userSlice/userSlice";
import { openModal } from "../store/tokenSlice/tokenSlice";

let flag = false;

export const checkTokenExpire = (store) => (next) => (action) => {
  if (action.type === 'token/openModal' || action.type === 'token/closeModal' || action.type==='user/logOut/pending' || action.type==='user/login/pending') {
    return next(action);
  }
  const token = Cookies.get("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    const tokenExpirationTime = decodedToken.exp * 1000;
    let currentDate = new Date();
    if ((tokenExpirationTime < currentDate.getTime()-1)) {
      console.log("Token expired");
      // store.dispatch(logOut());
      store.dispatch(openModal());
      // return;
    }
    else
      return next(action);
  }
  else  
    return;
}