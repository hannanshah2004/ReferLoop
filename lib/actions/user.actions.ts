import { googleLogin } from "./auth";


export const userLogin = async () => {
    const loggedInUser = await googleLogin()
    const userId = loggedInUser?.uid
  };