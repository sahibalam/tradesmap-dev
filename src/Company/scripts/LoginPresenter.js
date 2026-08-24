import { validateSignupData } from "../model/AuthModel";

export class LoginPresenter {
  constructor(view) {
    this.view = view;
  }

  handleInputChange(name, value) {
    this.view.updateForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  handleSubmit(event, formData) {
    event.preventDefault();

    const errors = validateSignupData(formData);

    if (Object.keys(errors).length > 0) {
      this.view.setErrors(errors);
      return;
    }

    this.view.setErrors({});
    this.view.onContinue();
  }
}
