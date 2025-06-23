import "./LaunchPage.css";

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
      <h1>Launch!</h1>
      <button onClick={handleNextStep}>Next Step</button>
    </div>
  );
}
export default LaunchPage;
