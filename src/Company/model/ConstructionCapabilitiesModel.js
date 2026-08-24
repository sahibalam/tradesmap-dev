// Initial state for Construction Capabilities.
// Capabilities start empty so every selection comes directly from the user.
export const initialCapabilitiesData = {
  selectedCapabilityIds: [],
  workPerformed: "self-perform",
  typicalProjectSize: "$1M – $10M",
  bondingCapacity: "Up to $5M",
};

export const validateCapabilitiesData = (data) => {
  const errors = {};
  if (!data.selectedCapabilityIds.length) errors.capabilities = "Select at least one capability.";
  if (!data.workPerformed) errors.workPerformed = "Choose how your company performs work.";
  if (!data.typicalProjectSize) errors.typicalProjectSize = "Select a typical project size.";
  return errors;
};
