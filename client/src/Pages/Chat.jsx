import React from "react";

export default function Chat() {
  return (
    <div className="w-full h-full flex justify-center items-center">Chat</div>
  );
}

// import moment from "moment";
// import { useDispatch, useSelector } from "react-redux";
// import { useCookies } from "react-cookie";
// import { logout } from "../slices/auth";
// import { useNavigate } from "react-router-dom";

// export default function Chat() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [cookies] = useCookies();
//   console.log(cookies);
//   const { user } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout())
//       .unwrap()
//       .then(() => {
//         return navigate("/auth/");
//       })
//       .catch((err) => console.log(err));
//   };

//   return user ? (
//     <>
//       <div>{user.name}</div>
//       <div>{user.email}</div>
//       <div>{user.gender}</div>
//       <div>{moment(user.birthdate).format("MM-DD-YYYY")}</div>
//       <button onClick={() => handleLogout()}>logout</button>
//     </>
//   ) : null;
// }
