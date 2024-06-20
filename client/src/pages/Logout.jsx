
import { useEffect } from "react";
//context
import { useUser } from "../context/userContext";
//react-router-dom
import { useNavigate } from "react-router-dom";

function Logout(){
  const { userSignout } = useUser();
  const navigate =  useNavigate();
  useEffect(() => {
    userSignout();
    navigate("/login")
  }, [])
  return (
    <></>
  )
}

export default Logout;