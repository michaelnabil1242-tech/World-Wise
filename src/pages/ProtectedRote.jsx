import { useEffect } from "react";
import { useAuth } from "../contexts/fakeAuthContext";
import { useNavigate } from "react-router";

function ProtectedRote({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate],
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRote;
