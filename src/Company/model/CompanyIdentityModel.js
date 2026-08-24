export const initialCompanyIdentityData = {
  legalName: "",
  dba: "",
  taxId: "",
  website: "",
  yearEstablished: "",
  description: "",
};

const isValidWebsite = (value) => {
  try {
    const address = value.match(/^https?:\/\//i) ? value : `https://${value}`;
    return Boolean(new URL(address).hostname.includes("."));
  } catch {
    return false;
  }
};

export const validateCompanyIdentity = (data) => {
  const errors = {};
  const currentYear = new Date().getFullYear();

  if (!data.legalName.trim()) errors.legalName = "Legal company name is required";
  if (!data.taxId.trim()) {
    errors.taxId = "EIN / Tax ID is required";
  } else if (!/^\d{2}-?\d{7}$/.test(data.taxId.trim())) {
    errors.taxId = "Use a valid EIN / Tax ID (for example, 26-1234567)";
  }

  const establishedYear = Number(data.yearEstablished);
  if (!data.yearEstablished) {
    errors.yearEstablished = "Year established is required";
  } else if (establishedYear < 1800 || establishedYear > currentYear) {
    errors.yearEstablished = "Choose a valid year";
  }

  if (data.website.trim() && !isValidWebsite(data.website.trim())) {
    errors.website = "Enter a valid website address";
  }

  if (!data.description.trim()) {
    errors.description = "Company description is required";
  } else if (data.description.trim().length < 20) {
    errors.description = "Use at least 20 characters to describe your company";
  }

  return errors;
};
