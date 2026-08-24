import { useMemo, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SignupForm from "./SignupForm";
import WelcomeSection from "./WelcomeSection";
import { initialSignupData } from "../model/AuthModel";
import { LoginPresenter } from "../scripts/LoginPresenter";
import "../styles/loginPage.css";

const LoginPage = ({ onContinue }) => {
  const [formData, setFormData] = useState(initialSignupData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const presenter = useMemo(
    () => new LoginPresenter({
      updateForm: setFormData,
      setErrors,
      setSuccess,
      onContinue: () => onContinue(formData),
    }),
    [onContinue]
  );

  const handleInputChange = (name, value) => {
    setSuccess("");
    presenter.handleInputChange(name, value);
  };

  const handleSubmit = (event) => {
    setSuccess("");
    presenter.handleSubmit(event, formData);
  };

  return (
    <div className="tradesmap-page">
      <Header />
      <main className="main-container">
        <SignupForm
          formData={formData}
          errors={errors}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          success={success}
        />
        <WelcomeSection />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
