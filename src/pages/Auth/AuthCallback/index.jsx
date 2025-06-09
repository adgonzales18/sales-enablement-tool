import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
    //eslint-disable-next-line
  }, []);

  navigate("/dashboard");

  return <div>Processing authentication...</div>;
};

export default AuthCallback;
