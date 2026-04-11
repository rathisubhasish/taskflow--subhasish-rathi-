import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import type { RootState } from "../store";
import { getAllUsers } from "../api/users.api";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../store/usersSlice";

export const useUsers = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(
    (state: RootState) => state.users,
  );

  const loadUsers = useCallback(async () => {
    // Only fetch if list is empty and we aren't already loading
    if (list.length > 0 || loading) return;

    dispatch(fetchUsersStart());
    try {
      const data = await getAllUsers();
      dispatch(fetchUsersSuccess(data));
    } catch (err: any) {
      dispatch(fetchUsersFailure(err.message || "Failed to fetch users"));
    }
  }, [dispatch, list.length, loading]);

  // ✅ Add this useEffect to trigger loading on mount
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const getAssigneeName = useCallback(
    (id: string) => {
      if (!id) return "Unassigned";
      const user = list.find((u) => u.id === id);
      return user ? user.name : "Unknown User";
    },
    [list],
  );

  return { users: list, loading, error, loadUsers, getAssigneeName };
};
