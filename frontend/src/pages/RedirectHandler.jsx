import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return null; 
};

export default RedirectHandler;