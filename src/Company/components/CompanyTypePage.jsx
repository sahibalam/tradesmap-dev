import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  CircleHelp,
  HardHat,
  Headphones,
  Info,
  LockKeyhole,
  MessageCircleMore,
  Truck,
  UsersRound,
  X,
} from "lucide-react";
import {
  initialCompanyTypeData,
  validateCompanyTypeData,
  validateOtherCategory,
} from "../model/CompanyTypeModel";
import "../styles/companyTypePage.css";

const steps = [
  "Welcome",
  "Company Identity",
  "Company Type & How You Use TradesMap",
  "Construction Capabilities",
  "Service Area",
  "Company Users & Primary Contact",
  "Documents & Qualifications",
];

const companyTypes = [
  { id: "contractor", label: "Contractor / Subcontractor", description: "We self-perform construction work.", icon: HardHat },
  { id: "general-contractor", label: "General Contractor", description: "We manage projects and hire subcontractors.", icon: Building2 },
  { id: "staffing", label: "Staffing / Labor Provider", description: "We provide skilled construction professionals.", icon: UsersRound },
  { id: "supplier", label: "Supplier / Vendor", description: "We supply materials, equipment, or services.", icon: Truck },
  { id: "other", label: "Other", description: "Other type of construction business.", icon: MessageCircleMore },
];

const usageOptions = [
  { id: "findProfessionals", label: "Find skilled construction professionals" },
  { id: "postProjects", label: "Post projects and opportunities" },
  { id: "manageTeam", label: "Manage my team and projects" },
  { id: "other", label: "Other (please specify)" },
];

const helpItems = companyTypes.map(({ id, label, description }) => ({ id, label, description: id === "other" ? "Choose if none of the above fits your business model." : `Best for businesses that ${description.replace("We ", "").replace("We", "").replace(".", "").toLowerCase()}` }));

const CompanyTypePage = ({ onBack, onContinue }) => {
  const [formData, setFormData] = useState(initialCompanyTypeData);
  const [errors, setErrors] = useState({});
  const [isOtherModalOpen, setIsOtherModalOpen] = useState(false);
  const [typeBeforeOther, setTypeBeforeOther] = useState(initialCompanyTypeData.companyType);
  const [otherDraft, setOtherDraft] = useState({ category: "", description: "" });
  const [otherErrors, setOtherErrors] = useState({});
  const [completionMessage, setCompletionMessage] = useState("");

  const chooseCompanyType = (type) => {
    setCompletionMessage("");
    setErrors((previous) => ({ ...previous, companyType: undefined }));

    if (type === "other") {
      setTypeBeforeOther(formData.companyType);
      setOtherDraft({ category: formData.otherCategory, description: formData.otherDescription });
      setOtherErrors({});
      setFormData((previous) => ({ ...previous, companyType: "other" }));
      setIsOtherModalOpen(true);
      return;
    }

    setFormData((previous) => ({ ...previous, companyType: type }));
  };

  const toggleUsage = (id) => {
    setCompletionMessage("");
    setErrors((previous) => ({ ...previous, uses: undefined, otherUseDescription: undefined }));
    setFormData((previous) => ({
      ...previous,
      uses: { ...previous.uses, [id]: !previous.uses[id] },
    }));
  };

  const updateOtherUseDescription = (value) => {
    setCompletionMessage("");
    setErrors((previous) => ({ ...previous, otherUseDescription: undefined }));
    setFormData((previous) => ({ ...previous, otherUseDescription: value }));
  };

  const saveOtherCategory = (event) => {
    event.preventDefault();
    const nextErrors = validateOtherCategory(otherDraft.category, otherDraft.description);
    setOtherErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setFormData((previous) => ({
      ...previous,
      companyType: "other",
      otherCategory: otherDraft.category.trim(),
      otherDescription: otherDraft.description.trim(),
    }));
    setIsOtherModalOpen(false);
  };

  const closeOtherModal = () => {
    setFormData((previous) => ({ ...previous, companyType: typeBeforeOther }));
    setIsOtherModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateCompanyTypeData(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // Routing is controlled by App.jsx. Once this page is valid,
    // call the supplied navigation callback immediately.
    onContinue?.(formData);
  };

  return (
    <div className="company-type-page">
      <div className="company-type-security"><LockKeyhole size={25} /><span><strong>Your information is secure</strong><small>and never shared without your permission.</small></span></div>

      <div className="company-type-shell">
        <aside className="company-type-sidebar" aria-label="Registration progress">
          <ol className="company-type-steps">
            {steps.map((step, index) => {
              const number = index + 1;
              const complete = number < 3;
              const active = number === 3;
              return <li key={step} className={active ? "active" : complete ? "complete" : ""}>
                <span className="company-type-step-number">{complete ? <Check size={17} strokeWidth={3} /> : number}</span>
                <span>{step}{complete && <small>Completed</small>}{active && <small>In Progress</small>}</span>
              </li>;
            })}
          </ol>
          <section className="company-type-help-card"><Headphones size={31} /><div><strong>Need Help?</strong><p>Our support team is here to assist you.</p></div><button type="button">Contact Support</button></section>
        </aside>

        <main className="company-type-content">
          <form onSubmit={handleSubmit} noValidate>
            <div className="company-type-body">
              <section className="company-type-form">
                <h1>Company Type &amp; How You Use TradesMap</h1>
                <p className="company-type-intro">Help us understand your business and how you plan to use TradesMap.</p>

                <fieldset className="type-fieldset">
                  <legend>Company Type</legend>
                  <div className="company-type-options" role="radiogroup" aria-label="Company type">
                    {companyTypes.map(({ id, label, description, icon: Icon }) => {
                      const selected = formData.companyType === id;
                      const otherLabel = id === "other" && formData.otherCategory ? `Other: ${formData.otherCategory}` : label;
                      return <button type="button" key={id} className={`company-type-option ${selected ? "selected" : ""}`} onClick={() => chooseCompanyType(id)} role="radio" aria-checked={selected}>
                        <Icon size={43} strokeWidth={1.65} />
                        <span><strong>{otherLabel}</strong><small>{id === "other" && formData.otherDescription ? formData.otherDescription : description}</small></span>
                        <i aria-hidden="true" />
                      </button>;
                    })}
                  </div>
                  {errors.companyType && <p className="company-type-error">{errors.companyType}</p>}
                  {errors.otherCategory && <p className="company-type-error">{errors.otherCategory}</p>}
                </fieldset>

                <fieldset className="use-fieldset">
                  <legend>How will you use TradesMap? <em>(Select all that apply)</em></legend>
                  {usageOptions.map(({ id, label }) => <label key={id} className="use-checkbox"><input type="checkbox" checked={formData.uses[id]} onChange={() => toggleUsage(id)} /><span>{label}</span></label>)}
                  {formData.uses.other && <label className="other-use-input">Please specify how else you will use TradesMap<input value={formData.otherUseDescription} onChange={(event) => updateOtherUseDescription(event.target.value)} placeholder="For example, promote specialized equipment rentals" />{errors.otherUseDescription && <small>{errors.otherUseDescription}</small>}</label>}
                  {errors.uses && <p className="company-type-error">{errors.uses}</p>}
                </fieldset>
              </section>

              <aside className="company-type-aside">
                <section className="company-type-why"><Info size={27} /><div><strong>Why we ask this</strong><p>This helps us personalize your experience and connect you with the right opportunities.</p></div></section>
                <section className="company-type-help"><h2>Need help choosing?</h2>{helpItems.map((item) => <div key={item.id}><strong>{item.label}</strong><p>{item.description}</p></div>)}</section>
              </aside>
            </div>

            <footer className="company-type-actions"><button type="button" className="company-type-back" onClick={onBack}>Back</button><div><button type="submit" className="company-type-continue">Continue <ArrowRight size={19} /></button>{completionMessage && <p>{completionMessage}</p>}</div></footer>
          </form>
        </main>
      </div>

      {isOtherModalOpen && <div className="other-modal-backdrop" role="presentation"><section className="other-modal" role="dialog" aria-modal="true" aria-labelledby="other-modal-title"><button type="button" className="other-modal-close" onClick={closeOtherModal} aria-label="Close category dialog"><X size={21} /></button><h2 id="other-modal-title">Add your company category</h2><p>Tell us the construction category that best describes your business.</p><form onSubmit={saveOtherCategory} noValidate><label>Category<input value={otherDraft.category} onChange={(event) => setOtherDraft((previous) => ({ ...previous, category: event.target.value }))} placeholder="For example, Equipment Rental" autoFocus />{otherErrors.category && <small>{otherErrors.category}</small>}</label><label>Description<textarea value={otherDraft.description} maxLength="500" onChange={(event) => setOtherDraft((previous) => ({ ...previous, description: event.target.value }))} placeholder="Briefly describe the work, materials, or services you provide." />{otherErrors.description && <small>{otherErrors.description}</small>}</label><footer><button type="button" onClick={closeOtherModal}>Cancel</button><button type="submit">Add Category</button></footer></form></section></div>}
    </div>
  );
};

export default CompanyTypePage;
