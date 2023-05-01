import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import Main from "components/main/Main";
import Header from "components/header/Header";
import Admin from "components/admin/Admin";
import Footer from "components/footer/Footer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
