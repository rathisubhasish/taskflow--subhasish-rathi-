import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes } from "./routes/config";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./routes/Layout";
import Landing from "./pages/Landing";
import Toast from "./components/ui/Toast";
import { useEffect } from "react";
import { useAppSelector } from "./store";
import Login from "./pages/authFolder/Login";
import Register from "./pages/authFolder/Register";

function App() {
  const { theme } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="bg-mainBg">
      <Toast />
      <BrowserRouter>
        <Routes>
          {/* --- PUBLIC --- */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* --- PROTECTED --- */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {privateRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
