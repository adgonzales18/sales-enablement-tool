import React from "react";
import { Route, Routes } from "react-router-dom";

import AuthGuard from "@/containers/AuthGuard";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import HomePage from "@/pages/HomePage";
import AuthCallback from "@/pages/Auth/AuthCallback";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path={`/auth/login`}
          element={
              <Login />
          }
        />

        <Route
          path={`/auth/register`}
          element={
              <Register />
          }
        />

        <Route
          path="/"
          element={
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          }
        />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          }
        />
      </Routes>
    </>
  );
};

export default App;
