import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import Main from "components/main/Main";
import Header from "components/header/Header";
import Admin from "components/admin/Admin";
import Footer from "components/footer/Footer";
import { makeStyles, useTheme } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
const queryClient = new QueryClient();

const useStyles = makeStyles((theme) => ({
  marginBottom: "3em",
}));

function App() {
  const classes = useStyles();
  //const theme = useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
