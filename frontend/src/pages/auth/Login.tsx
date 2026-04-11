import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { ApiError, LoginCredentials } from "../../types";
import { setAuth } from "../../store/authSlice";
import type { RootState } from "../../store";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser } from "../../api/auth.api";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginCredentials) => {
    if (isLoading) return;
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await loginUser(data);
      dispatch(setAuth(response));
      navigate("/dashboard");
    } catch (err) {
      const error = err as ApiError;
      setApiError(error.message || "Login failed");

      if (error.fields) {
        Object.keys(error.fields).forEach((key) => {
          setError(key as keyof LoginCredentials, {
            type: "manual",
            message: error.fields![key],
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-500 to-rose-400 bg-clip-text text-transparent cursive">
            TaskFlow
          </h3>
          <p className="text-slate-500 mt-2 text-center">
            Sign in to manage your projects and tasks
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {apiError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
              {apiError}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            required
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              className="pr-12" // Padding to prevent text overlap with the icon
              error={errors.password?.message}
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <Button
            type="submit"
            loading={isLoading}
            variant="primary"
            className="w-full mt-2"
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
