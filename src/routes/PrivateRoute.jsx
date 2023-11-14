import { Navigate } from "react-router-dom";

function Private({ login, children }) {
  if (login) {
    return children;
  }
  return <Navigate to="/" replace />;
}
export default Private;
