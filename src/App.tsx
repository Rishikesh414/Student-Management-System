import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Layout
import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/common/ProtectedRoute";

// Auth
import Login from "@/pages/auth/Login";

// Dashboard
import StudentDashboard from "@/pages/dashboard/StudentDashboard";

// Profile
import BasicInfo from "@/pages/profile/BasicInfo";
import PersonalInfo from "@/pages/profile/PersonalInfo";
import ParentInfo from "@/pages/profile/ParentInfo";
import ReferenceInfo from "@/pages/profile/ReferenceInfo";
import Photos from "@/pages/profile/Photos";

// Academics
import Attendance from "@/pages/academics/Attendance";
import Marks from "@/pages/academics/Marks";
import Timetable from "@/pages/academics/Timetable";

// Records
import Projects from "@/pages/records/Projects";
import Certifications from "@/pages/records/Certifications";
import Disciplinary from "@/pages/records/Disciplinary";

// Knowledge
import Repository from "@/pages/knowledge/Repository";
import Discussions from "@/pages/knowledge/Discussions";

// Errors
import Unauthorized from "@/pages/errors/Unauthorized";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<StudentDashboard />} />

              {/* Profile */}
              <Route path="/profile/basic" element={<BasicInfo />} />
              <Route path="/profile/personal" element={<PersonalInfo />} />
              <Route path="/profile/parent" element={<ParentInfo />} />
              <Route path="/profile/reference" element={<ReferenceInfo />} />
              <Route path="/profile/photos" element={<Photos />} />

              {/* Academics */}
              <Route path="/academics/attendance" element={<Attendance />} />
              <Route path="/academics/marks" element={<Marks />} />
              <Route path="/academics/timetable" element={<Timetable />} />

              {/* Records */}
              <Route path="/records/projects" element={<Projects />} />
              <Route path="/records/certifications" element={<Certifications />} />
              <Route path="/records/disciplinary" element={<Disciplinary />} />

              {/* Knowledge */}
              <Route path="/knowledge/repository" element={<Repository />} />
              <Route path="/knowledge/discussions" element={<Discussions />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
