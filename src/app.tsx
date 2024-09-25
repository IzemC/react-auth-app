import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Welcome from "./pages/welcome";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Header from "./components/header";
import useAuthStore from "./store/auth.store";
import { useEffect } from "react";
import AuthRoute from "./components/auth-route";

const theme = createTheme();
function App() {
  const { initializeAuth, hasInitialize } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {hasInitialize && (
          <>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <AuthRoute component={<Welcome />} isProtected={true} />
                }
              />

              <Route
                path="/signin"
                element={
                  <AuthRoute component={<SignIn />} isProtected={false} />
                }
              />
              <Route
                path="/signup"
                element={
                  <AuthRoute component={<SignUp />} isProtected={false} />
                }
              />
            </Routes>
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
