import { BrowserRouter, Routes, Route } from "react-router-dom";

//PAGES
import LandingPage from "./pages/LandingPage/Landingpage";
import AuthPage from "./pages/AuthPage/AuthPage";
import TrainPage from "./pages/OnboardingPages/TrainPage/TrainPage";
import CustomizePage from "./pages/OnboardingPages/CustomizePage/CustomizePage";
import LaunchPage from "./pages/OnboardingPages/LaunchPage/LaunchPage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/train" element={<TrainPage />} />
          <Route path="/customize" element={<CustomizePage />} />
          <Route path="/launch" element={<LaunchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
