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
  // We need to pull the LATEST values from the store
  const { list, loading, error } = useSelector(
    (state: RootState) => state.users,
  );

  const loadUsers = useCallback(async () => {
    // ❌ REMOVE THE CHECK FROM HERE - Logic moved to useEffect
    dispatch(fetchUsersStart());
    try {
      const data = await getAllUsers();
      dispatch(fetchUsersSuccess(data));
    } catch (err: any) {
      dispatch(fetchUsersFailure(err.message || "Failed to fetch users"));
    }
  }, [dispatch]);

  useEffect(() => {
    // ✅ THE FIX: Strict check to prevent multiple triggers
    // Only fetch if:
    // 1. We have no data
    // 2. We aren't ALREADY fetching (loading is false)
    if (list.length === 0 && !loading && !error) {
      loadUsers();
    }
  }, [loadUsers, list.length, loading, error]);

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
