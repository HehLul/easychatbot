import "./CustomizePage.css";

import { useNavigate } from "react-router-dom";

function CustomizePage() {
  const navigate = useNavigate();
  const handleNextStep = async (e) => {
    e.preventDefault();
    //do stuff to customize info ...
    navigate("/launch");
  };

  return (
    <div className="customize-page">
      <h1>Customize your Chatbot Frontend</h1>
      <button onClick={handleNextStep}>Next Step</button>
    </div>
  );
}
export default CustomizePage;
