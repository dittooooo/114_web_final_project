import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MealCreatePage from "./pages/MealCreatePage";
import MealEditPage from "./pages/MealEditPage";
import MealDetailPage from "./pages/MealDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/meals/new"
          element={
            <ProtectedRoute>
              <MealCreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meals/:id"
          element={
            <ProtectedRoute>
              <MealDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meals/:id/edit"
          element={
            <ProtectedRoute>
              <MealEditPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
