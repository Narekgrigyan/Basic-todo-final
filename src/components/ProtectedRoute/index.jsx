import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";
const ProtectedRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  if(loading) {
    return <Spin spinning={loading} />
  }

  if ((!user && error) || (!user && !loading)) {
    return <Navigate to={"/sign-in"} />;
  }

  if (user && !error) {
    return <>{children}</>;
  }

};

export default ProtectedRoute;
