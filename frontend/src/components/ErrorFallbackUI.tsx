// src/components/ErrorFallback.tsx
import Button from "./ui/Button";

const ErrorFallback = ({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-100">
        <div className="text-6xl mb-4">🔌</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-slate-500 mb-6">
          We're having trouble connecting to the server. Please check your
          internet or try again.
        </p>
        <Button
          onClick={resetErrorBoundary}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
