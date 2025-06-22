import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//PAGES
import LandingPage from "./pages/LandingPage/Landingpage";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
