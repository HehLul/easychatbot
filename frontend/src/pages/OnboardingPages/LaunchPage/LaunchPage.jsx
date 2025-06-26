import "./LaunchPage.css";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

import { useNavigate } from "react-router-dom";

function LaunchPage() {
  const navigate = useNavigate();
  const handleNextStep = async (e) => {
    e.preventDefault();
    //do stuff to customize info ...
    navigate("/");
  };

  return (
    <div className="launch-page">
      <ProgressBar
        currentStep={2}
        totalSteps={3}
        steps={["Train", "Customize", "Deploy"]}
        onBack={() => navigate("/customize")}
        onNext={() => navigate("/dashboard")}
        onSkipToDashboard={() => navigate("/dashboard")}
        nextButtonText="Launch"
      />
      <h1>Launch!</h1>
      <button onClick={handleNextStep}>Next Step</button>
    </div>
  );
}
export default LaunchPage;
