export const initialSignupData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  referralCode: "",
  termsAccepted: false,
  privacyAccepted: false,
  communicationAccepted: false,
};

export const validateSignupData = (data) => {
  const errors = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";

  if (!data.email.trim()) {
    errors.email = "Work email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!data.password) errors.password = "Password is required";
  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!data.termsAccepted) {
    errors.termsAccepted = "Please accept the Terms of Use";
  }

  if (!data.privacyAccepted) {
    errors.privacyAccepted = "Please acknowledge the Privacy Notice";
  }

  return errors;
};