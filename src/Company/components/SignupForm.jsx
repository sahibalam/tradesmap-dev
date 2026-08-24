import { useState } from "react";
import { User, Mail, Eye, EyeOff, Gift, Building2 } from "lucide-react";
import InputField from "./InputField";

const SignupForm = ({ formData, errors, onChange, onSubmit, success }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const checkbox = (name) => (event) => onChange(name, event.target.checked);

  const visibilityButton = (isVisible, toggle, fieldName) => (
    <button
      type="button"
      className="password-visibility-button"
      onClick={toggle}
      aria-label={`${isVisible ? "Hide" : "Show"} ${fieldName}`}
      aria-pressed={isVisible}
    >
      {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  );

  return (
    <section className="signup-card">
      <h1>Create Company Account</h1>

      <form onSubmit={onSubmit}>
        <div className="form-row">
          <InputField label="First Name" name="firstName" placeholder="Enter first name"
            value={formData.firstName} onChange={onChange} error={errors.firstName} icon={<User size={20} />} />
          <InputField label="Last Name" name="lastName" placeholder="Enter last name"
            value={formData.lastName} onChange={onChange} error={errors.lastName} icon={<User size={20} />} />
        </div>

        <InputField label="Work Email" name="email" type="email" placeholder="Enter work email"
          value={formData.email} onChange={onChange} error={errors.email} icon={<Mail size={20} />} />

        <div className="form-row">
          <InputField label="Password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter password"
            value={formData.password} onChange={onChange} error={errors.password}
            icon={visibilityButton(showPassword, () => setShowPassword((visible) => !visible), "password")} />
          <InputField label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password"
            value={formData.confirmPassword} onChange={onChange} error={errors.confirmPassword}
            icon={visibilityButton(showConfirmPassword, () => setShowConfirmPassword((visible) => !visible), "confirm password")} />
        </div>

        <div className="checkbox-section">
          <label className="checkbox-label">
            <input type="checkbox" checked={formData.termsAccepted} onChange={checkbox("termsAccepted")} />
            <span>I agree to the TradesMap <a href="#terms">Terms of Use</a></span>
          </label>
          {errors.termsAccepted && <small className="error-text">{errors.termsAccepted}</small>}

          <label className="checkbox-label">
            <input type="checkbox" checked={formData.privacyAccepted} onChange={checkbox("privacyAccepted")} />
            <span>I acknowledge the TradesMap <a href="#privacy">Privacy Notice.</a></span>
          </label>
          {errors.privacyAccepted && <small className="error-text">{errors.privacyAccepted}</small>}

          <label className="checkbox-label">
            <input type="checkbox" checked={formData.communicationAccepted} onChange={checkbox("communicationAccepted")} />
            <span>I agree to receive account and operational communications electronically.</span>
          </label>
        </div>

        <InputField label="Invitation or Referral Code (Optional)" name="referralCode"
          placeholder="Enter code if you have one" value={formData.referralCode}
          onChange={onChange} icon={<Gift size={20} />} />

        <button type="submit" className="continue-button">
          <Building2 size={23} /> Continue
        </button>

        {success && <p className="success-text">{success}</p>}

        <div className="signin-bottom">
          Already have an account? <a href="#signin">Sign in</a>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
