import { Fragment, useEffect } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { getUser } from "./redux/userSlice/apiCalls";
import { getPlayLists } from "./redux/playListSlice/apiCalls";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Sidebar from "./component/Sidebar";
import PrivateRoute from "./PrivateRoute";
import LikedSongs from "./pages/LikedSongs";
import Library from "./pages/Library";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import Navbar from "./component/Navbar";
import AudioPlayer from "./component/AudioPlayer";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const { currentSong } = useSelector((state) => state.audioPlayer);
  useEffect(() => {
    let token = null;
    const root = JSON.parse(window.localStorage.getItem("persist:root"));

    if (root) {
      const { auth } = root;
      const { user } = JSON.parse(auth);
      if (user) token = user.token;
    }

    if (user && token) {
      getUser(user._id, dispatch);
      getPlayLists(dispatch);
    }
  }, [dispatch, user]);

  return (
    <Fragment>
      {user &&
        location.pathname !== "/login" &&
        location.pathname !== "/" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/not-found" && (
          <Fragment>
            <Navbar />
            <Sidebar />
            {currentSong && <AudioPlayer />}
          </Fragment>
        )}
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/collection/tracks" element={<LikedSongs />} />
        <Route exact path="/collection/playlists" element={<Library />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/playlist/:id" element={<Playlist />} />
        {/* {user && <Navigate from="/signup" to="/home" />}
				{user && <Navigate from="/login" to="/home" />} */}
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        {/* <Route
          exact
          path="/home"
          element={
            <PrivateRoute exact user={user} path="/home" component={<Home />} />
          }
        />
        <Route
          exact
          path="/collection/tracks"
          element={
            <PrivateRoute
              exact
              user={user}
              path="/collection/tracks"
              component={<LikedSongs />}
            />
          }
        />
        <Route
          exact
          path="/collection/playlists"
          element={
            <PrivateRoute
              exact
              user={user}
              path="/collection/playlists"
              component={<Library />}
            />
          }
        />
        <Route
          exact
          path="/search"
          element={
            <PrivateRoute
              exact
              user={user}
              path="/search"
              component={<Search />}
            />
          }
        />
        <Route
          exact
          path="/playlist/:id"
          element={
            <PrivateRoute
              exact
              user={user}
              path="/playlist/:id"
              component={<Playlist />}
            />
          }
        /> */}
        {/* {user && <Navigate from="/signup" to="/home" />}
        {user && <Navigate from="/login" to="/home" />} */}
      </Routes>
    </Fragment>
  );
};

export default App;
