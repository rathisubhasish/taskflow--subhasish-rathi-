// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes } from "./routes/config";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Toast from "./components/ui/Toast";

// src/App.tsx
function App() {
  return (
    <>
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
    </>
  );
}

export default App;
