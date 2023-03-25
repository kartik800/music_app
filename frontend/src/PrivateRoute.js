import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const { currentSong } = useSelector((state) => state.audioPlayer);

  const styles = {
    padding: currentSong ? "6rem 0 10rem 26rem" : "6rem 0 0 26rem",
    backgroundColor: "#181818",
    color: "#ffffff",
    minHeight: "calc(100vh - 6rem)",
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <div style={styles}>
            <Component {...props} />
          </div>
        ) : (
          <Navigate
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const PrivateRoute = ({ user, Component }) => {
//   const Navigate = useNavigate();
//   useEffect(() => {
//     if (!user) {
//       Navigate("/login");
//     }
//   }, []);

//   return (
//     <div>
//       <Component />
//     </div>
//   );
// };

// export default PrivateRoute;
