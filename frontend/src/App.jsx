import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Toaster for showing toast messages globally

import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";

// Route Guards
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";

// Admin Pages
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";

function App() {
  return (
    <BrowserRouter>
      {/* Global toaster component to show toast messages anywhere in the app */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Redirect base URL to /admin-dashboard */}
        <Route path="/" element={<Navigate to={"/admin-dashboard"} />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Admin protected routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Default child route */}
          <Route index element={<AdminSummary />} />

          {/* Department-related routes */}
          <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
        </Route>

        {/* Employee dashboard route */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
