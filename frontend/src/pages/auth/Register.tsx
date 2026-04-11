import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { setAuth } from "../../store/authSlice";
import type { AuthResponse, RegisterCredentials } from "../../types";
import type { RootState } from "../../store";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>();

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

  const onSubmit = async (data: RegisterCredentials) => {
    if (isLoading) return;
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/register",
        data,
      );
      dispatch(setAuth(response.data));
    } catch (err: any) {
      setApiError(err.response?.data?.error || "Registration failed.");
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
            Join TaskFlow and stay organized
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {apiError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
              {apiError}
            </div>
          )}

          {/* Full Name Input */}
          <Input
            label="Full Name"
            placeholder="Jane Doe"
            required
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />

          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            required
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />

          {/* Password Input with Visibility Toggle */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              className="pr-12" // Add padding to the right so text doesn't hide behind the eye
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                  message:
                    "Include uppercase, lowercase, number, and special character",
                },
              })}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors"
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
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
