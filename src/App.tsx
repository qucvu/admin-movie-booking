import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "Components/ErrorBoundary/ErrorBoundary";
import LoadingLazy from "Components/LoadingLazy/LoadingLazy";
import HomeTemplate from "Templates/HomeTemplate/HomeTemplate";
import FormTemplate from "Templates/FormTemplate/FormTemplate";
import ProtectedRoute from "Pages/Routes/ProtectedRoute";
import Checkout from "Pages/Checkout/Checkout";

const FilmManagement = lazy(
  () => import("Pages/FilmManagement/FilmManagement")
);
const UserMangement = lazy(() => import("Pages/UserManagement/UserMangement"));
const AddMovie = lazy(() => import("Pages/AddMovies/AddMovie"));
const AddUser = lazy(() => import("Pages/AddUser/AddUser"));
const AddShowTimes = lazy(() => import("Pages/AddShowTimes/AddShowTimes"));
const Login = lazy(() => import("Pages/Login/Login"));
const DetailMovie = lazy(
  () => import("Pages/FilmManagement/DetailMovie/DetailMovie")
);
const DetailUser = lazy(
  () => import("Pages/UserManagement/DetailUser/DetailUser")
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingLazy />}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomeTemplate />
                </ProtectedRoute>
              }
            >
              <Route index element={<FilmManagement />} />
              <Route path="detail/movie/:movieId" element={<DetailMovie />} />
              <Route path="detail/user/:userId" element={<DetailUser />} />

              <Route path="user-management" element={<UserMangement />} />
              <Route path="add-movie" element={<AddMovie />} />
              <Route path="add-user" element={<AddUser />} />

              <Route path="add-showtimes" element={<AddShowTimes />} />
            </Route>
            <Route path="form" element={<FormTemplate />}>
              <Route path="login" element={<Login />} />
            </Route>
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to={"/"} />}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
