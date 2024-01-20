import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import GuestRoutes from "./utils/GuestRoutes";
import Auth from "./Pages/Auth";
import Chat from "./Pages/Chat";
import Users from "./Pages/Users";
import Profile from "./Pages/Profile";
import Setting from "./Pages/Setting";
import VerifyEmail from "./Pages/VerifyEmail";
import apiSetup from "./utils/api";
import { store } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, useEffect } from "react";
import { clearMessage } from "./slices/message";
import ConfirmEmail from "./Pages/ConfirmEmail";
import HomeLayout from "./Components/layouts/HomeLayout";
import { useTranslation } from "react-i18next";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  const { message } = useSelector((state) => state.message);

  apiSetup(store, navigate);

  useEffect(() => {
    if (message) {
      toast(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(clearMessage());
  }, [dispatch, message]);

  return (
    <div
      dir={dir}
      className="flex flex-col ltr:font-archivo rtl:font-cairo text-paragraph items-center justify-center w-full min-h-screen max-h-screen flex-1 text-center bg-primary"
    >
      <Suspense fallback="Loading">
        <Routes>
          <Route
            path="/verifyEmail"
            element={
              <ProtectedRoutes isVerified={false}>
                <VerifyEmail />
              </ProtectedRoutes>
            }
          />
          <Route path="/" element={<Navigate to="/chats" replace />} />
          <Route
            path="/chats"
            element={
              <ProtectedRoutes isVerified={true}>
                <HomeLayout>
                  <Chat />
                </HomeLayout>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/chats/:id"
            element={
              <ProtectedRoutes isVerified={true}>
                <HomeLayout>
                  <Chat />
                </HomeLayout>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/users"
            element={
              <HomeLayout>
                <Users />
              </HomeLayout>
            }
          />
          <Route
            path="/users/:id"
            element={
              <HomeLayout>
                <Users />
              </HomeLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes isVerified={true}>
                <HomeLayout>
                  <Profile />
                </HomeLayout>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoutes isVerified={true}>
                <HomeLayout>
                  <Setting />
                </HomeLayout>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/settings/:page"
            element={
              <ProtectedRoutes isVerified={true}>
                <HomeLayout>
                  <Setting />
                </HomeLayout>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/auth"
            element={
              <GuestRoutes>
                <Auth />
              </GuestRoutes>
            }
          />
          <Route path="/verify" element={<ConfirmEmail />} />
          <></>
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Suspense>
    </div>
  );
}

export default App;
