import { FiFolder } from "react-icons/fi";
import Button from "../../../components/ui/Button";

const EmptyProjectCard = () => {
  return (
    <div className="col-span-full bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
        <FiFolder size={32} />
      </div>
      <h2 className="text-xl font-bold text-slate-800">No projects yet</h2>
      <p className="text-slate-500 mb-6">
        Create your first project to start tracking tasks.
      </p>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => console.log("add project")}
      >
        Create Project
      </Button>
    </div>
  );
};

export default EmptyProjectCard;
