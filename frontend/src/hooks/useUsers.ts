import { useCallback, useEffect } from "react";
import { getAllUsers } from "../apiFolder/users.api";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../store/usersSlice";
import { useAppDispatch, useAppSelector } from "../store";

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.users);

  const loadUsers = useCallback(async () => {
    dispatch(fetchUsersStart());
    try {
      const data = await getAllUsers();
      dispatch(fetchUsersSuccess(data));
    } catch (err: any) {
      dispatch(fetchUsersFailure(err.message || "Failed to fetch users"));
    }
  }, [dispatch]);

  useEffect(() => {
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
