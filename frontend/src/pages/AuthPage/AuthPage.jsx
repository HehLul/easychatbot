import "./AuthPage.css";

import { useNavigate } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    //do stuff to authenticat user...
    navigate("/train");
  };

  return (
    <div className="auth-page">
      <p>
        This Button imitates the signup/login action. This is a dummy for
        acctually authenticating new user
      </p>
      <button onClick={handleSignin}>Signup/Login</button>
    </div>
  );
}

export default AuthPage;
