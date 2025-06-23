import "./TrainPage.css";

import { useNavigate } from "react-router-dom";

function TrainPage() {
  const navigate = useNavigate();
  const handleNextStep = async (e) => {
    e.preventDefault();
    //do stuff to train info ...
    navigate("/customize");
  };

  return (
    <div className="train-page">
      <h1>Train your AI Chatbot</h1>
      <button onClick={handleNextStep}>Next Step</button>
    </div>
  );
}

export default TrainPage;
