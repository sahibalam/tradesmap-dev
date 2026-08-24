import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Hammer,
  Headphones,
  Info,
  Landmark,
  LockKeyhole,
  Pickaxe,
  Plus,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import capabilitiesDataset from "../data/capabilities.json";
import {
  initialCapabilitiesData,
  validateCapabilitiesData,
} from "../model/ConstructionCapabilitiesModel";
import "../styles/constructionCapabilitiesPage.css";

const steps = [
  "Welcome",
  "Company Identity",
  "Company Type & How You Use TradesMap",
  "Construction Capabilities",
  "Service Area",
  "Company Users & Primary Contact",
  "Documents & Qualifications",
];

const iconMap = {
  concrete: Hammer,
  earthwork: Pickaxe,
  structural: Landmark,
  demolition: Hammer,
  masonry: Landmark,
  carpentry: Hammer,
  drywall: Hammer,
  roofing: Hammer,
  plumbing: Hammer,
  electrical: Hammer,
  hvac: Hammer,
  painting: Hammer,
  flooring: Hammer,
};

const workOptions = [
  ["self-perform", "Self-Perform"],
  ["self-perform-subcontractors", "Self-Perform with Subcontractors"],
  ["management-only", "Management Only"],
];

const projectSizes = ["Under $1M", "$1M – $10M", "$10M – $50M", "$50M+"];
const bondingOptions = ["Not applicable", "Up to $1M", "Up to $5M", "$5M+"];

// The JSON is organized as 26 trade packages. Flatten the nested capabilities
// once so the UI can search all 260 capability records efficiently.
const capabilities = capabilitiesDataset.trade_packages.flatMap((tradePackage) =>
  tradePackage.capabilities.map((capability) => ({
    ...capability,
    package: capability.package_name || tradePackage.package_name,
    keywords: Array.isArray(capability.keywords)
      ? capability.keywords
      : tradePackage.keywords || [],
  }))
);

const matchesCapability = (item, query) => {
  const searchable = [item.name, item.package, ...(item.keywords || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return searchable.includes(query);
};

const CapabilityIcon = ({ type }) => {
  const Icon = iconMap[type] || Hammer;
  return <Icon size={36} strokeWidth={1.7} />;
};

const CapabilityRow = ({ item, onRemove }) => (
  <article className="capability-row">
    <CapabilityIcon type={item.icon} />
    <div><strong>{item.name}</strong><span>{item.package_id} - {item.package}</span></div>
    <button type="button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}><X size={21} /></button>
  </article>
);

const ConstructionCapabilitiesPage = ({ onBack, onContinue }) => {
  const [formData, setFormData] = useState(initialCapabilitiesData);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState("");
  const [errors, setErrors] = useState({});

  const selectedCapabilities = useMemo(
    () => capabilities.filter((item) => formData.selectedCapabilityIds.includes(item.id)),
    [formData.selectedCapabilityIds]
  );

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];
    return capabilities
      .filter((item) => !formData.selectedCapabilityIds.includes(item.id))
      .filter((item) => matchesCapability(item, query));
  }, [search, formData.selectedCapabilityIds]);

  const modalResults = useMemo(() => {
    const query = modalSearch.trim().toLowerCase();
    return capabilities
      .filter((item) => !formData.selectedCapabilityIds.includes(item.id))
      .filter((item) => !query || matchesCapability(item, query));
  }, [modalSearch, formData.selectedCapabilityIds]);

  const addCapability = (id, source = "search") => {
    setFormData((previous) => ({
      ...previous,
      selectedCapabilityIds: [...previous.selectedCapabilityIds, id],
    }));
    setErrors((previous) => ({ ...previous, capabilities: undefined }));
    if (source === "search") setSearch("");
  };

  const removeCapability = (id) => {
    setFormData((previous) => ({
      ...previous,
      selectedCapabilityIds: previous.selectedCapabilityIds.filter((itemId) => itemId !== id),
    }));
  };

  const clearAll = () => {
    setFormData((previous) => ({ ...previous, selectedCapabilityIds: [] }));
  };

  const updateField = (name, value) => {
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateCapabilitiesData(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0 && onContinue) onContinue(formData);
  };

  return (
    <div className="capabilities-page">
      <div className="capabilities-security"><LockKeyhole size={25} /><span><strong>Your information is secure</strong><small>and never shared without your permission.</small></span></div>

      <div className="capabilities-shell">
        <aside className="capabilities-sidebar" aria-label="Registration progress">
          <ol className="capabilities-steps">
            {steps.map((step, index) => {
              const number = index + 1;
              const complete = number < 4;
              const active = number === 4;
              return <li key={step} className={active ? "active" : complete ? "complete" : ""}>
                <span className="capabilities-step-number">{complete ? <Check size={17} strokeWidth={3} /> : number}</span>
                <span>{step}{complete && <small>Completed</small>}{active && <small>In Progress</small>}</span>
              </li>;
            })}
          </ol>
          <section className="capabilities-help-card"><Headphones size={31} /><div><strong>Need Help?</strong><p>Our support team is here to assist you.</p></div><button type="button">Contact Support</button></section>
        </aside>

        <main className="capabilities-content">
          <form onSubmit={handleSubmit} noValidate>
            <div className="capabilities-body">
              <section className="capabilities-form">
                <h1>Construction Capabilities</h1>
                <p className="capabilities-intro">Select the trades and services your company provides.</p>

                <div className="capability-search-wrap">
                  <Search size={25} />
                  <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search trades or services..." aria-label="Search trades or services" />
                  {search && <div className="capability-search-results">
                    {searchResults.length ? searchResults.map((item) => <button type="button" key={item.id} onClick={() => addCapability(item.id)}><CapabilityIcon type={item.icon} /><span><strong>{item.name}</strong><small>{item.package}</small></span><Plus size={20} /></button>) : <p>No matching capabilities found.</p>}
                  </div>}
                </div>

                <div className="selected-heading"><h2>Selected Capabilities ({selectedCapabilities.length})</h2>{selectedCapabilities.length > 0 && <button type="button" onClick={clearAll}>Clear All</button>}</div>
                <div className="selected-capabilities">
                  {selectedCapabilities.map((item) => <CapabilityRow key={item.id} item={item} onRemove={removeCapability} />)}
                </div>
                {errors.capabilities && <p className="capability-error">{errors.capabilities}</p>}

                <button type="button" className="add-capability-button" onClick={() => { setModalSearch(""); setIsModalOpen(true); }}><Plus size={22} /> Add another capability</button>

                <fieldset className="work-fieldset">
                  <legend>Work Performed</legend>
                  {workOptions.map(([id, label]) => <label key={id} className="work-radio"><input type="radio" name="workPerformed" value={id} checked={formData.workPerformed === id} onChange={(event) => updateField("workPerformed", event.target.value)} /><span>{label}</span></label>)}
                  {errors.workPerformed && <p className="capability-error">{errors.workPerformed}</p>}
                </fieldset>

                <div className="capability-select-row">
                  <label>Typical Project Size<select value={formData.typicalProjectSize} onChange={(event) => updateField("typicalProjectSize", event.target.value)}>{projectSizes.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={18} /></label>
                  <label>Bonding Capacity <em>(optional)</em><select value={formData.bondingCapacity} onChange={(event) => updateField("bondingCapacity", event.target.value)}>{bondingOptions.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={18} /></label>
                </div>
              </section>

              <aside className="capabilities-aside">
                <section className="capabilities-why"><Info size={27} /><div><strong>Why we ask this</strong><p>This helps us match your company with the right projects and opportunities on TradesMap.</p></div></section>
                <section className="capabilities-tips"><h2>Tips for selecting capabilities</h2><div><Check size={18} /><p>Select the trades and services your company is qualified to perform.</p></div><div><Check size={18} /><p>Add as many capabilities as accurately represent your expertise.</p></div><div><Check size={18} /><p>You can update these anytime from your company profile.</p></div></section>
              </aside>
            </div>

            <footer className="capabilities-actions"><button type="button" className="capabilities-back" onClick={onBack}>Back</button><button type="submit" className="capabilities-continue">Continue <ArrowRight size={19} /></button></footer>
          </form>
        </main>
      </div>

      {isModalOpen && <div className="capability-modal-backdrop" onMouseDown={() => setIsModalOpen(false)}><section className="capability-modal" role="dialog" aria-modal="true" aria-labelledby="capability-modal-title" onMouseDown={(event) => event.stopPropagation()}><button type="button" className="capability-modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close"><X size={22} /></button><h2 id="capability-modal-title">Add a capability</h2><p>Search and select from the available construction trades and services.</p><div className="modal-search"><Search size={21} /><input autoFocus value={modalSearch} onChange={(event) => setModalSearch(event.target.value)} placeholder="Search capabilities..." /></div><div className="modal-capability-list">{modalResults.length ? modalResults.map((item) => <button type="button" key={item.id} onClick={() => addCapability(item.id, "modal")}><CapabilityIcon type={item.icon} /><span><strong>{item.name}</strong><small>{item.package}</small></span><Plus size={20} /></button>) : <p>No more capabilities match your search.</p>}</div></section></div>}
    </div>
  );
};

export default ConstructionCapabilitiesPage;
