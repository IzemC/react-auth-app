import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";

interface AuthRouteProps {
  component: JSX.Element;
  isProtected?: boolean;
}

const AuthRoute = ({ component, isProtected }: AuthRouteProps) => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isProtected && !isAuthenticated) {
      navigate("/signin");
    } else if (!isProtected && isAuthenticated) {
      navigate("/");
    }
  }, [isProtected, isAuthenticated, navigate]);

  return component;
};

export default AuthRoute;
