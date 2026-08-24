import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Circle, CircleMarker, useMap } from "react-leaflet";
import { ArrowRight, Check, Headphones, Info, MapPin, Plus, Search, ShieldCheck, X } from "lucide-react";
import "leaflet/dist/leaflet.css";
import serviceAreas from "../data/serviceAreas.json";
import { formatAreaLabel, initialServiceAreaData, searchServiceAreas, validateServiceAreaData } from "../model/ServiceAreaModel";
import "../styles/serviceAreaPage.css";

const steps = [
  "Welcome", "Company Identity", "Company Type & How You Use TradesMap", "Construction Capabilities",
  "Service Area", "Company Users & Primary Contact", "Documents & Qualifications",
];

const milesToMeters = (miles) => miles * 1609.344;

function MapViewport({ area }) {
  const map = useMap();
  useEffect(() => {
    if (area) map.setView([area.lat, area.lng], area.population > 500000 ? 9 : 10, { animate: true });
  }, [area, map]);
  return null;
}

const AreaResult = ({ area, onSelect }) => (
  <button type="button" className="service-area-result" onClick={() => onSelect(area)}>
    <MapPin size={18} />
    <span><strong>{formatAreaLabel(area)}</strong><small>{area.state}, United States</small></span>
    <Plus size={18} />
  </button>
);

const ServiceAreaPage = ({ onBack, onContinue }) => {
  const [formData, setFormData] = useState(initialServiceAreaData);
  const [primarySearch, setPrimarySearch] = useState("");
  const [isPrimarySearchOpen, setIsPrimarySearchOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const primaryResults = useMemo(() => searchServiceAreas(serviceAreas, primarySearch), [primarySearch]);
  const additionalResults = useMemo(() => {
    const selectedIds = new Set([
      formData.primaryArea?.id,
      ...formData.additionalAreaIds,
    ].filter(Boolean));

    const availableAreas = serviceAreas.filter((area) => !selectedIds.has(area.id));

    // Like the Construction Capabilities modal, show available data immediately.
    // When the user types, filter the same JSON library.
    if (!modalSearch.trim()) {
      return availableAreas
        .slice()
        .sort((a, b) => (b.population || 0) - (a.population || 0))
        .slice(0, 50);
    }

    return searchServiceAreas(availableAreas, modalSearch, 50);
  }, [formData.additionalAreaIds, formData.primaryArea, modalSearch]);

  const additionalAreas = useMemo(
    () => serviceAreas.filter((area) => formData.additionalAreaIds.includes(area.id)),
    [formData.additionalAreaIds]
  );

  const selectPrimary = (area) => {
    setFormData((prev) => ({ ...prev, primaryArea: area }));
    setPrimarySearch(formatAreaLabel(area));
    setIsPrimarySearchOpen(false);
    setErrors((prev) => ({ ...prev, primaryArea: undefined }));
  };

  const addAdditional = (area) => {
    // Use the latest state so the first result and fast repeated clicks cannot create duplicates.
    setFormData((prev) => {
      if (prev.primaryArea?.id === area.id || prev.additionalAreaIds.includes(area.id)) {
        return prev;
      }

      return {
        ...prev,
        additionalAreaIds: [...prev.additionalAreaIds, area.id],
      };
    });

    setModalSearch("");
    setIsModalOpen(false);
  };

  const removeAdditional = (id) => setFormData((prev) => ({ ...prev, additionalAreaIds: prev.additionalAreaIds.filter((itemId) => itemId !== id) }));

  const setRadius = (radiusMiles) => setFormData((prev) => ({ ...prev, radiusMiles: Number(radiusMiles) }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateServiceAreaData(formData);
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) onContinue?.(formData);
  };

  return (
    <div className="service-page">
      <div className="service-security"><ShieldCheck size={26} fill="currentColor" /><span><strong>Your information is secure</strong><small>and never shared without your permission.</small></span></div>
      <div className="service-shell">
        <aside className="service-sidebar">
          <ol className="service-steps">{steps.map((step, index) => {
            const number = index + 1; const complete = number < 5; const active = number === 5;
            return <li key={step} className={active ? "active" : complete ? "complete" : ""}><span className="service-step-number">{complete ? <Check size={17} strokeWidth={3} /> : number}</span><span>{step}{complete && <small>Completed</small>}{active && <small>In Progress</small>}</span></li>;
          })}</ol>
          <section className="service-help-card"><Headphones size={31} /><div><strong>Need Help?</strong><p>Our support team is here to assist you.</p></div><button type="button">Contact Support</button></section>
        </aside>
        <main className="service-content"><form onSubmit={handleSubmit} noValidate>
          <div className="service-body"><section className="service-form">
            <h1>Service Area</h1><p className="service-intro">Where does your company provide services?</p>
            <label className="primary-area-label">Primary Service Area
              <div className="service-search-wrap">
                <Search size={22} />
                <input
                  value={primarySearch}
                  onFocus={() => setIsPrimarySearchOpen(true)}
                  onChange={(e) => { setPrimarySearch(e.target.value); setIsPrimarySearchOpen(true); }}
                  placeholder="Enter city or state"
                  aria-label="Primary Service Area"
                />
                {isPrimarySearchOpen && primarySearch.trim() && (
                  <div className="service-search-results">
                    {primaryResults.length
                      ? primaryResults.map((area) => <AreaResult key={area.id} area={area} onSelect={selectPrimary} />)
                      : <p>No matching city or state found.</p>}
                  </div>
                )}
              </div>
            </label>{errors.primaryArea && <p className="service-error">{errors.primaryArea}</p>}
            <div className="service-map" aria-label="Service area map">
              <MapContainer center={[39.8283, -98.5795]} zoom={4} scrollWheelZoom={false} zoomControl={false}>
                <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapViewport area={formData.primaryArea} />
                {formData.primaryArea && <><Circle center={[formData.primaryArea.lat, formData.primaryArea.lng]} radius={milesToMeters(formData.radiusMiles)} pathOptions={{ color: "#2166c5", fillColor: "#2166c5", fillOpacity: 0.18 }} /><CircleMarker center={[formData.primaryArea.lat, formData.primaryArea.lng]} radius={10} pathOptions={{ color: "#fff", fillColor: "#2166c5", fillOpacity: 1, weight: 3 }} /></>}
                {additionalAreas.map((area) => <CircleMarker key={area.id} center={[area.lat, area.lng]} radius={7} pathOptions={{ color: "#fff", fillColor: "#2166c5", fillOpacity: 1, weight: 2 }} />)}
              </MapContainer>
              {formData.primaryArea && <div className="map-radius-badge">{formData.radiusMiles} miles</div>}
            </div>
            <div className="radius-header"><strong>Service Radius</strong><span>{formData.radiusMiles} miles</span></div>
            <input className="radius-slider" type="range" min="10" max="150" step="5" value={formData.radiusMiles} onChange={(e) => setRadius(e.target.value)} />
            <div className="radius-scale"><span>10 miles</span><span>150 miles</span></div>
            <section className="additional-areas"><strong>Additional Service Areas <em>(optional)</em></strong><div className="area-chips">{additionalAreas.map((area) => <span key={area.id}>{formatAreaLabel(area)}<button type="button" onClick={() => removeAdditional(area.id)} aria-label={`Remove ${formatAreaLabel(area)}`}><X size={17} /></button></span>)}</div></section>
            <button type="button" className="add-area-button" onClick={() => { setModalSearch(""); setIsModalOpen(true); }}><Plus size={21} />Add another area</button>
          </section>
          <aside className="service-aside"><section className="service-why"><Info size={27} /><div><strong>Why we ask this</strong><p>This helps us match projects and opportunities in the areas where your company operates.</p></div></section><section className="service-tips"><h2>Tips for selecting your service area</h2><div><Check size={18} /><p>Set a service radius to show how far you can travel for projects.</p></div><div><Check size={18} /><p>Add multiple locations if your company serves in different areas.</p></div><div><Check size={18} /><p>You can update these anytime from your company profile.</p></div></section></aside></div>
          <footer className="service-actions"><button type="button" className="service-back" onClick={onBack}>Back</button><button type="submit" className="service-continue">Continue <ArrowRight size={19} /></button></footer>
        </form></main>
      </div>
      {isModalOpen && <div className="service-modal-backdrop" onMouseDown={() => setIsModalOpen(false)}><section className="service-modal" role="dialog" aria-modal="true" aria-labelledby="add-area-title" onMouseDown={(e) => e.stopPropagation()}><button type="button" className="service-modal-close" onClick={() => setIsModalOpen(false)}><X size={22} /></button><h2 id="add-area-title">Add another service area</h2><p>Search the same location library and add the cities your company serves.</p><div className="modal-area-search"><Search size={21} /><input autoFocus value={modalSearch} onChange={(e) => setModalSearch(e.target.value)} placeholder="Search city or state..." /></div><div className="modal-area-list">{additionalResults.length ? additionalResults.map((area) => <AreaResult key={area.id} area={area} onSelect={addAdditional} />) : <p>No available locations match your search.</p>}</div></section></div>}
    </div>
  );
};
export default ServiceAreaPage;
