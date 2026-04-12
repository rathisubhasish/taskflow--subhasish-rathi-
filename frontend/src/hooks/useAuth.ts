import { useAppDispatch, useAppSelector } from "../store";
import { logout as logoutAction } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, accessToken, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth,
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
