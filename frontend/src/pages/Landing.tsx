import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { useEffect } from "react";

const Landing = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-white">
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="flex items-center">
              <h1 className=" text-center w-fit mx-auto px-4 py-2 rounded-lg border font-extrabold bg-gradient-to-r from-primary via-blue-500 to-red-400 bg-clip-text text-transparent cursive">
                TaskFlow
              </h1>
            </div>
            <h2 className="text-4xl md:text-7xl font-extrabold text-slate-900 tracking-tight cursive">
              Manage projects with <br />
              <span className="text-indigo-600 italic">unmatched speed.</span>
            </h2>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
              TaskFlow is the minimalist project management tool designed for
              developers who value focus over features. No bloat, just
              productivity.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
              >
                Start for Free
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-slate-700 font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]" />
        </div>
      </header>

      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900">Blazing Fast</h3>
              <p className="text-slate-600">
                Built with Vite and React for near-instant load times and zero
                lag.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Task Hierarchy
              </h3>
              <p className="text-slate-600">
                Organize your workflow into Projects and Tasks with clear
                priority levels.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Secure by Design
              </h3>
              <p className="text-slate-600">
                JWT-based authentication ensures your project data stays
                private.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-400 text-sm">
        &copy; 2026 TaskFlow Inc. Built with React & Redux.
      </footer>
    </div>
  );
};

export default Landing;
