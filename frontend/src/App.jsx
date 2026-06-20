import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import Recommendations from "./pages/Recommendations";
import AdminDashboard from "./pages/AdminDashboard";

import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const defaultRedirect =
    localStorage.getItem("token") !== null ? "/dashboard" : "/";

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Outlet />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Route>
      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
      <Route
        path="/register"
        element={<Navigate to="/auth/register" replace />}
      />

      {/* User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessment"
        element={
          <ProtectedRoute>
            <Assessment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />

      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to={defaultRedirect} replace />} />
    </Routes>
  );
}
