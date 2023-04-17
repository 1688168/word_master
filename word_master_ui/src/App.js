import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import Main from "components/main/main";
import Header from "components/header/header";

const queryClient = new QueryClient();

const Admin = () => <h1>"I am Admin"</h1>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
