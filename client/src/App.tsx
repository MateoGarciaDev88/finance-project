import { Box, createTheme, CssBaseline } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Categories, Dashboard, Login, Movements, Registro } from './screens/index';
import ProtectedRoute from "./screens/ProtectedRoute";
import AuthProvider from "./auth/AuthProvider";
import Navbar from "./screens/global/Navbar";
// import { AuthProvider } from "./context/AuthContext";
// import { AuthProvider } from "./auth/AuthProvider";
// import PrivateRoute from "./components/PrivateRoute";


function App() {
  const theme = useMemo( () => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <SidebarComp> */}
          <AuthProvider>
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <Navbar />
              <Routes>
                <Route path="/registro" element={ <Registro /> } />
                <Route path="/login" element={ <Login /> } />
                <Route element={<ProtectedRoute />} >
                  <Route path="/" element={ <Dashboard /> } />
                  <Route path="/movements" element={ <Movements /> } />
                  <Route path="/categories" element={ <Categories /> } />
                </Route>
              </Routes>
            </Box>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
};

export default App;