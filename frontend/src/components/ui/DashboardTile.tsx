import { twMerge } from "tailwind-merge";

const DashboardTile = ({
  title,
  value,
  description,

  className,
  leftClassName,
  titleClassName,
  descriptionClassName,

  valueWrapperClassName,
  valueClassName,
}) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 w-full gap-12",
        className,
      )}
    >
      {/* LEFT SIDE */}
      <div className={twMerge("flex flex-col", leftClassName)}>
        <h3
          className={twMerge(
            "text-sm text-gray-500 font-medium",
            titleClassName,
          )}
        >
          {title}
        </h3>

        {description && (
          <p
            className={twMerge(
              "text-xs sm:text-sm text-gray-400 mt-1",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        )}
      </div>

      {/* RIGHT SIDE VALUE BADGE */}
      <div
        className={twMerge(
          "bg-gray-100 px-3 py-1.5 rounded-full flex items-center justify-center min-w-[48px]",
          valueWrapperClassName,
        )}
      >
        <span
          className={twMerge(
            "text-sm sm:text-base font-bold text-gray-900",
            valueClassName,
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default DashboardTile;
