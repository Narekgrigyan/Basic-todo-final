import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";
const UnprotectedRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  if(loading) {
    return <Spin loading={loading} />
  }

  if (user && !error) {
    return <Navigate to={"/"} />;
  }

  if (!user && !error) {
    return <>{children}</>;
  }

};

export default UnprotectedRoute;
