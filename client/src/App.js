import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import GuestRoutes from "./utils/GuestRoutes";
import Auth from "./Pages/Auth";
import Chat from "./Pages/Chat";
import Group from "./Pages/Group";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import Setting from "./Pages/Setting";
import VerifyEmail from "./Pages/VerifyEmail";
import apiSetup from "./utils/api";
import { store } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { clearMessage } from "./slices/message";
import ConfirmEmail from "./Pages/ConfirmEmail";
import HomeLayout from "./Components/layouts/HomeLayout";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div className="flex flex-col font-archivo text-paragraph items-center justify-center w-full min-h-screen max-h-screen flex-1 text-center bg-primary">
      <Routes>
        <Route
          path="/verifyEmail"
          element={
            <ProtectedRoutes isVerified={false}>
              <VerifyEmail />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/"
          element={
            <HomeLayout>
              <Chat />
            </HomeLayout>
          }
        />
        <Route
          path="/groups"
          element={
            <HomeLayout>
              <Group />
            </HomeLayout>
          }
        />
        <Route
          path="/contacts"
          element={
            <HomeLayout>
              <Contact />
            </HomeLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <HomeLayout>
              <Profile />
            </HomeLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <HomeLayout>
              <Setting />
            </HomeLayout>
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
    </div>
  );
}

export default App;
