import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Toaster } from "@/components/ui/sonner";
import AppRoutes from "@/routes/index";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
