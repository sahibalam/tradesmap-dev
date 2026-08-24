export const initialCompanyTypeData = {
  companyType: "contractor",
  otherCategory: "",
  otherDescription: "",
  otherUseDescription: "",
  uses: {
    findProfessionals: true,
    postProjects: true,
    manageTeam: true,
    other: false,
  },
};

export const validateCompanyTypeData = (data) => {
  const errors = {};

  if (!data.companyType) errors.companyType = "Choose your company type";
  if (data.companyType === "other" && !data.otherCategory.trim()) {
    errors.otherCategory = "Add a category for your company type";
  }
  if (!Object.values(data.uses).some(Boolean)) {
    errors.uses = "Select at least one way you will use TradesMap";
  }
  if (data.uses.other && !data.otherUseDescription.trim()) {
    errors.otherUseDescription = "Please tell us how else you will use TradesMap";
  }

  return errors;
};

export const validateOtherCategory = (category, description) => {
  const errors = {};

  if (!category.trim()) errors.category = "Category is required";
  if (!description.trim()) {
    errors.description = "Description is required";
  } else if (description.trim().length < 10) {
    errors.description = "Please add at least 10 characters";
  }

  return errors;
};
