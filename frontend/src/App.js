import React, { Suspense, lazy } from "react";
import { Redirect, Switch } from "react-router-dom";
import AppBar from "./components/AppBar";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import "./App.css";

const RegisterView = lazy(() => import("./views/RegisterView/RegisterView"));
const LoginView = lazy(() => import("./views/LoginView/LoginView"));

const HomeView = lazy(() => import("./views/HomeView/HomeView"));
const MyInfoView = lazy(() => import("./views/MyInfoView/MyInfoView"));

export default function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <PublicRoute exact path="/">
            <HomeView />
          </PublicRoute>
          <PrivateRoute path="/myinfo">
            <MyInfoView />
          </PrivateRoute>
          <PublicRoute exact path="/register" restricted>
            <RegisterView />
          </PublicRoute>
          <PublicRoute exact path="/login" restricted>
            <LoginView />
          </PublicRoute>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </>
  );
}
