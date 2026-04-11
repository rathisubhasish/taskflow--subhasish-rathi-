import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { logout as logoutAction } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use 'accessToken' to match your slice
  const { user, accessToken, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  return {
    user,
    token: accessToken,
    isAuthenticated,
    loading,
    logout: handleLogout,
  };
};
