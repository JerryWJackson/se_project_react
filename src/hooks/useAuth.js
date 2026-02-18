import { useState, useEffect, useContext, useCallback } from "react";
import * as auth from "../utils/auth";
import { getToken, handleToken, checkToken } from "../utils/token";
import { ModalContext } from "../contexts/ModalContext";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const { handleCloseModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const handleRegistration = ({ user }) => {
    setAuthLoading(true);
    auth
      .register({ user })
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
        handleLogin(res.email, res.password);
        handleCloseModal();
        navigate("/profile");
      })
      .catch(console.error)
      .finally(() => setAuthLoading(false));
  };

  const handleLogin = (email, password) => {
    setAuthLoading(true);
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          handleToken(data.token);
          auth.getUserData(data.token).then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
          });
          handleCloseModal();
          navigate("/profile");
        }
      })
      .catch(console.error)
      .finally(() => setAuthLoading(false));
  };

  const handleUpdateUser = (values) => {
    setAuthLoading(true);
    const jwt = getToken();
    auth
      .updateUserProfile(values, jwt)
      .then((res) => {
        setCurrentUser(res);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => setAuthLoading(false));
  };

  const handleSignOut = () => {
    handleToken(); // Clear token
    setCurrentUser(null);
    setIsLoggedIn(false);
    handleCloseModal();
    navigate("/");
  };

  useEffect(() => {
    const jwt = getToken();
    if (jwt) {
      if (checkToken(jwt)) {
        setIsLoggedIn(true);
        auth
          .getUserData(jwt)
          .then((data) => {
            setCurrentUser(data);
          })
          .catch((err) => {
            console.error(err);
            if (err.response && err.response.status === 401) {
              handleSignOut();
            }
          });
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  return {
    currentUser,
    isLoggedIn,
    authLoading,
    handleRegistration,
    handleLogin,
    handleUpdateUser,
    handleSignOut,
  };
}
