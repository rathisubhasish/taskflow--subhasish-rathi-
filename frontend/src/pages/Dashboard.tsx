import { useAppSelector } from "../store";
import Button from "../components/ui/Button";
import { DashboardTileSkeleton } from "../components/ui/Skeleton";
import { useDashboardStats } from "../features/dashboard/hooks/useDashboardStats";
import { FiCheckCircle, FiClock, FiFolder, FiUsers } from "react-icons/fi";
import DashboardTile from "../features/dashboard/components/DashboardTile";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { stats, loading, error } = useDashboardStats();

  const tileConfig = [
    {
      title: "Total Projects",
      value: stats?.projects.total || 0,
      icon: <FiFolder size={20} />,
    },
    {
      title: "Total Users",
      value: stats?.users?.totalUsers || 0,
      icon: <FiUsers size={20} />,
    },
    {
      title: "Total Tasks",
      value: stats?.tasks.total || 0,
      icon: <FiCheckCircle size={20} />,
    },
    {
      title: "Todo Tasks",
      value: stats?.tasks.todo || 0,
      icon: <FiCheckCircle size={20} />,
    },
    {
      title: "Inprogress Tasks",
      value: stats?.tasks.inprogress || 0,
      icon: <FiCheckCircle size={20} />,
    },
    {
      title: "Completed Tasks",
      value: stats?.tasks.completed || 0,
      icon: <FiCheckCircle size={20} />,
    },
    {
      title: "Overdue",
      value: stats?.tasks.overdue || 0,
      icon: <FiClock size={20} />,
      isAlert: (stats?.tasks.overdue ?? 0) > 0,
    },
  ];

  const commonTileStyles =
    "bg-gradient-to-r from-primary sm:max-w-fit to-purple-600 text-white";

  return (
    <div className="space-y-8">
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="w-full flex flex-col flex-grow rounded-lg">
          <div className="bg-cardBg w-full px-4 sm:p-0 p-4 rounded-2xl border shadow flex flex-col flex-grow justify-center items-center text-center">
            <h1 className="text-3xl font-bold">
              Welcome, <span className="text-secondary">{user?.name}</span> 👋
            </h1>
            <p className=" mt-2">
              Here is what's happening with overall company projects.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col flex-grow rounded-lg">
          <div className="bg-primary px-6 py-6 rounded-2xl text-white shadow w-full">
            <h3 className="text-xl font-bold mb-2 text-white">
              Manage Projects
            </h3>
            <p className="text-indigo-100 mb-6 text-sm">
              View ongoing projects, track progress, and manage tasks.
            </p>
            <Button
              href="/projects"
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-6"
            >
              Go to Projects
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-4 sm:flex-wrap">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <DashboardTileSkeleton key={i} />
          ))
        ) : error ? (
          <div className="w-full p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
            {error}
          </div>
        ) : (
          tileConfig.map((tile, index) => (
            <DashboardTile
              key={index}
              title={tile.title}
              value={tile.value}
              icon={tile.icon}
              className={`${commonTileStyles} ${tile.isAlert ? "ring-2 ring-red-400" : ""}`}
              titleClassName="text-white/80"
              descriptionClassName="text-white"
              valueWrapperClassName="bg-white/20"
              valueClassName="text-white"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
