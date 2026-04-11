import { twMerge } from "tailwind-merge";

export const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={twMerge("animate-pulse bg-slate-200 rounded-md", className)}
  />
);

export const DashboardTileSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full space-y-2 sm:w-[240px]">
    <Skeleton className="h-4 w-24" /> {/* Title area */}
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-16" /> {/* Value area */}
      <Skeleton className="h-10 w-10 rounded-full" /> {/* Icon area */}
    </div>
    <Skeleton className="h-3 w-32" /> {/* Description area */}
  </div>
);

export const ProjectCardSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl sm:max-w-[270px] sm:min-w-[270px] w-full border border-slate-200 shadow-sm space-y-4">
    {/* Icon box */}
    <Skeleton className="w-11 h-11 rounded-xl" />

    {/* Title */}
    <Skeleton className="h-6 w-3/4" />

    {/* Description lines */}
    <div className="space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>

    {/* Footer/Date */}
    <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
      <Skeleton className="h-3 w-3 rounded-full" />
      <Skeleton className="h-3 ml-auto w-20" />
    </div>
  </div>
);

export const TaskCardSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-sm">
    <div className="flex justify-between items-center">
      <Skeleton className="h-5 w-16 rounded" /> {/* Priority Chip */}
      <Skeleton className="h-5 w-5 rounded-full" /> {/* Menu Dots */}
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" /> {/* Title */}
      <Skeleton className="h-3 w-full" /> {/* Description line 1 */}
    </div>
    <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded-full" /> {/* User Avatar */}
        <Skeleton className="h-3 w-20" /> {/* User Name */}
      </div>
      <Skeleton className="h-3 w-12" /> {/* Due Date */}
    </div>
  </div>
);

export const KanbanColumnSkeleton = () => (
  <div className="w-full md:w-80 flex flex-col gap-4">
    <div className="flex items-center gap-2 px-1">
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-6 rounded" />
    </div>
    <div className="space-y-3">
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
    </div>
  </div>
);
