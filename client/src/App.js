import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import GuestRoutes from "./utils/GuestRoutes";
import Auth from "./Pages/Auth";
import Chat from "./Pages/Chat";

function App() {
  return (
    <div className="flex flex-col font-archivo text-paragraph items-center justify-center w-full min-h-screen max-h-screen flex-1 text-center bg-primary">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Chat />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/auth"
          element={
            <GuestRoutes>
              <Auth />
            </GuestRoutes>
          }
        />
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
