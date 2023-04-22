import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import Main from "components/main/main";
import Header from "components/header/header";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
const queryClient = new QueryClient();

const Admin = () => <h1>"I am Admin"</h1>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
