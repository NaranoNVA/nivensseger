import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box } from "@mui/material";
import { Footer } from "./mainComponents/footer";
import { Head } from "./mainComponents/head";
import { Login } from "./components/Login";
import { Cadastro } from "./components/Cadastro";
import { Conversa } from "./components/Conversa/Conversa";
import { Amigos } from "./components/Amigos/Amigos";
import { Pesquisa } from "./components/Pesquisa/Pesquisa";
import { Conversas } from "./components/Conversas/Conversas";

export const UserContext = React.createContext();
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [usuarioAtual, setUsuarioAtual] = React.useState(undefined);

  return (
    <UserContext.Provider value={{usuarioAtual, setUsuarioAtual}}>
      <ThemeProvider theme={darkTheme}>
      <Head/>
        <Box component="main" sx={{ backgroundColor: 'grey.800', height: '100vh' }}>
          <Container>
            <BrowserRouter>
                <Routes>
                  {
                    usuarioAtual === undefined &&
                    <>
                      <Route path="/login" element={<Login />} />
                      <Route path="/cadastro" element={<Cadastro />} />
                      <Route path="*" element={<Navigate to="/login" replace />} />
                    </>
                  }
                  {
                    usuarioAtual !== undefined &&
                    <>
                      <Route path="/pessoas" element={<Pesquisa />} />
                      {/*<Route path="/perfil/:userId?" element={<Cadastro />} />*/}
                      <Route path="/amigos" element={<Amigos />} />
                      <Route path="/conversas" element={<Conversas />} />
                      {/*<Route path="/conversa" element={<Conversa />} />*/}
                      <Route path="/conversa/:conversaId" element={<Conversa />} />
                      <Route path="*" element={<Navigate to="/conversas" replace />} />
                    </>
                  }
                </Routes>
            </BrowserRouter>
          </Container>
        </Box>
        <Footer/>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
