import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/Layouts/AppLayout";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CategoriesPage from "./pages/CategoriesPage";
import ScrollToTop from "./ui/ScrollToTop";
import AdminCoursesPage from "./pages/AdminCoursesPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import { useUser } from "./reactQuery/useUser";
import LiveChat from "./pages/LiveChat";
import InstructorDashboardPage from "./pages/InstructorDashboardPage";
import NewCoursePage from "./pages/NewCoursePage";
import InstructorAppLayout from "./ui/Layouts/InstructorAppLayout";
import NewCourseLayout from "./ui/Layouts/NewCourseLayout";
import ManageCoursePage from "./pages/ManageCoursePage";
import CourseLandingPage from "./pages/CourseLandingPage";
import CourseLandingPageLayout from "./ui/Layouts/CourseLandingPageLayout";
import CartPage from "./pages/CartPage";
import MyLearningPage from "./pages/MyLearningPage";
import SignupPage from "./pages/SignupPage";
import MessagesPage from "./pages/MessagesPage";

function App() {
  useUser();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/courses/admin" element={<AdminCoursesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/chat" element={<LiveChat />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/my-courses/learning" element={<MyLearningPage />} />
          <Route path="/messages" element={<MessagesPage />} />

          {/* <Route path="*" /> */}
        </Route>
        <Route element={<CourseLandingPageLayout />}>
          <Route
            path="/course/:id/lecture/:lectureId"
            element={<CourseLandingPage />}
          />
        </Route>

        <Route element={<InstructorAppLayout />}>
          <Route
            path="/instructor/courses"
            element={<InstructorDashboardPage />}
          />
          <Route
            path="/instructor/course/:id/manage"
            element={<ManageCoursePage />}
          />
        </Route>

        <Route element={<NewCourseLayout />}>
          <Route path="/instructor/courses/new" element={<NewCoursePage />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3500,
            style: {
              fontWeight: "bold",
              width: "90%",
            },
          },
          error: {
            duration: 5000,
            style: {
              width: "90%",
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
