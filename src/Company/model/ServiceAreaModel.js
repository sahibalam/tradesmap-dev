export const initialServiceAreaData = {
  primaryArea: null,
  additionalAreaIds: [],
  radiusMiles: 75,
};

export const validateServiceAreaData = (data) => {
  const errors = {};
  if (!data.primaryArea) errors.primaryArea = "Select a primary service area to continue.";
  return errors;
};

export const formatAreaLabel = (area) => `${area.city}, ${area.state_code}`;

export const searchServiceAreas = (areas, query, limit = 8) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return areas
    .filter((area) => {
      const searchable = [area.city, area.city_ascii, area.state, area.state_code].filter(Boolean).join(" ").toLowerCase();
      return searchable.includes(normalized);
    })
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, limit);
};
