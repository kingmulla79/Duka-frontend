/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

//check if there is a valid user session
export default function UserAuth() {
  const { user } = useSelector((state: any) => state.auth);
  if (user) {
    return true;
  } else {
    return false;
  }
}
