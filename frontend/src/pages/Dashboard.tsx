// src/pages/Dashboard.tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import Button from "../components/ui/Button";
import { useEffect } from "react";
import { getAllUsers } from "../api/users.api";
import {
  fetchUsersFailure,
  fetchUsersStart,
  fetchUsersSuccess,
} from "../store/usersSlice";
import DashboardTile from "../components/ui/DashboardTile";
import { DashboardTileSkeleton } from "../components/ui/Skeleton";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const loadUsers = async () => {
      dispatch(fetchUsersStart());
      try {
        const data = await getAllUsers();
        dispatch(fetchUsersSuccess(data));
      } catch (err: any) {
        dispatch(fetchUsersFailure(err.message || "Failed to fetch users"));
      }
    };
    if (list.length === 0) {
      loadUsers();
    }
  }, [dispatch, list.length]);

  return (
    <div className="space-y-8">
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="w-full flex flex-col flex-grow rounded-lg">
          <div className="bg-white w-full px-4 sm:p-0 p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col flex-grow justify-center items-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome, <span className="text-indigo-600">{user?.name}</span> 👋
            </h1>
            <p className="text-slate-500 mt-2">
              Here is what's happening with your projects today.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col flex-grow rounded-lg">
          <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Quick Action Card */}
            <div className="bg-indigo-600 px-4 py-4 rounded-2xl text-white shadow-lg shadow-indigo-100 w-full">
              <h3 className="text-xl font-bold mb-2">Manage Projects</h3>
              <p className="text-indigo-100 mb-6 text-sm">
                View all your ongoing projects, track progress, and manage team
                tasks.
              </p>
              <Button href="/projects" className="text-white px-4">
                Go to Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row gap-4 sm:flex-wrap">
        {loading ? (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <DashboardTileSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            <DashboardTile
              title="Total Users"
              description="Active this week"
              className="bg-gradient-to-r from-primary sm:max-w-fit to-purple-600 text-white"
              titleClassName="text-white"
              descriptionClassName="text-white"
              valueWrapperClassName="bg-white/20"
              valueClassName="text-white"
              value={list.length ? list.length : 0}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
