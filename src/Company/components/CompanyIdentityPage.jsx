import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  FileText,
  Globe2,
  Headphones,
  ImagePlus,
  Info,
  LockKeyhole,
  Pencil,
  Upload,
  UserRound,
} from "lucide-react";
import {
  initialCompanyIdentityData,
  validateCompanyIdentity,
} from "../model/CompanyIdentityModel";
import "../styles/companyIdentityPage.css";

const steps = [
  "Welcome",
  "Company Identity",
  "Company Type & How You Use TradesMap",
  "Construction Capabilities",
  "Service Area",
  "Company Users & Primary Contact",
  "Documents & Qualifications",
];

const PreviewItem = ({ icon, label, children }) => (
  <div className="preview-item">
    {icon}
    <div>
      <strong>{label}</strong>
      <p>{children || "Not provided yet"}</p>
    </div>
  </div>
);

const Field = ({ label, name, error, children, optional = false, showOptional = false }) => (
  <label className={`identity-field ${error ? "has-error" : ""} ${optional ? "is-optional" : ""}`} htmlFor={name}>
    <span>{label}{showOptional && <em> (optional)</em>}</span>
    {children}
    {error && <small>{error}</small>}
  </label>
);

const CompanyIdentityPage = ({ onCancel, onContinue }) => {
  const [formData, setFormData] = useState(initialCompanyIdentityData);
  const [errors, setErrors] = useState({});
  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState("");

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1799 }, (_, index) => currentYear - index);
  }, []);

  useEffect(() => () => {
    if (logo?.url) URL.revokeObjectURL(logo.url);
  }, [logo]);

  const updateField = (name, value) => {
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const selectLogo = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const supportedTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (!supportedTypes.includes(file.type) || file.size > 2 * 1024 * 1024) {
      setLogoError("Use a JPG, PNG, or SVG file no larger than 2 MB.");
      event.target.value = "";
      return;
    }

    setLogoError("");
    setLogo((previous) => {
      if (previous?.url) URL.revokeObjectURL(previous.url);
      return { name: file.name, url: URL.createObjectURL(file) };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateCompanyIdentity(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0 && !logoError) {
      onContinue();
    }
  };

  return (
    <div className="identity-page">
      <div className="identity-security"><LockKeyhole size={25} /><span><strong>Your information is secure</strong><small>and never shared without your permission.</small></span></div>

      <div className="identity-shell">
        <aside className="identity-sidebar" aria-label="Registration progress">
          <ol className="step-list">
            {steps.map((step, index) => {
              const number = index + 1;
              const active = number === 2;
              const complete = number === 1;
              return <li key={step} className={active ? "active" : complete ? "complete" : ""}>
                <span className="step-number">{complete ? <Check size={18} strokeWidth={3} /> : number}</span>
                <span>{step}{complete && <small>Completed</small>}{active && <small>In Progress</small>}</span>
              </li>;
            })}
          </ol>

          <section className="help-card">
            <Headphones size={31} />
            <div><strong>Need Help?</strong><p>Our support team is here to assist you.</p></div>
            <button type="button">Contact Support</button>
          </section>
        </aside>

        <main className="identity-content">
          <form onSubmit={handleSubmit} noValidate>
            <div className="identity-body">
              <section className="identity-form">
                <h1>Company Identity</h1>
                <p className="identity-intro">Tell us about your company.</p>

                <Field label="Legal Company Name" name="legalName" error={errors.legalName}>
                  <input id="legalName" value={formData.legalName} onChange={(event) => updateField("legalName", event.target.value)} placeholder="ABC Construction Services, LLC" />
                </Field>

                <div className="identity-row">
                  <Field label="DBA (if applicable)" name="dba" error={errors.dba} optional>
                    <input id="dba" value={formData.dba} onChange={(event) => updateField("dba", event.target.value)} placeholder="ABC Construction" />
                  </Field>
                  <Field label="EIN / Tax ID" name="taxId" error={errors.taxId}>
                    <input id="taxId" value={formData.taxId} onChange={(event) => updateField("taxId", event.target.value)} placeholder="26-1234567" />
                  </Field>
                </div>

                <div className="identity-row">
                  <Field label="Company Website" name="website" error={errors.website} optional showOptional>
                    <input id="website" value={formData.website} onChange={(event) => updateField("website", event.target.value)} placeholder="www.example.com" />
                  </Field>
                  <Field label="Year Established" name="yearEstablished" error={errors.yearEstablished}>
                    <select id="yearEstablished" value={formData.yearEstablished} onChange={(event) => updateField("yearEstablished", event.target.value)}>
                      <option value="">Select year</option>
                      {years.map((year) => <option key={year} value={year}>{year}</option>)}
                    </select>
                  </Field>
                </div>

                <div className="logo-field">
                  <span>Company Logo</span>
                  <div className="logo-upload-row">
                    <div className="logo-placeholder">
                      {logo ? <img src={logo.url} alt="Selected company logo" /> : <ImagePlus size={44} />}
                    </div>
                    <div className="upload-copy">
                      <strong>{logo ? logo.name : "No logo uploaded"}</strong>
                      <p>JPG, PNG or SVG (max. 2MB)</p>
                      <label className="upload-button"><Upload size={18} /> Upload Logo<input type="file" accept="image/jpeg,image/png,image/svg+xml" onChange={selectLogo} /></label>
                      {logoError && <small>{logoError}</small>}
                    </div>
                  </div>
                </div>

                <Field label="Company Description" name="description" error={errors.description}>
                  <div className="description-wrap">
                    <textarea id="description" maxLength="500" value={formData.description} onChange={(event) => updateField("description", event.target.value)} placeholder="Tell us about the services your company provides." />
                    <small>{formData.description.length} / 500</small>
                  </div>
                </Field>
              </section>

              <aside className="identity-preview-column">
                <section className="why-card"><Info size={27} /><div><strong>Why this information matters</strong><p>This helps us verify your business and match you with the right opportunities.</p></div></section>
                <section className="company-preview">
                  <h2>Company Preview</h2>
                  <PreviewItem icon={<UserRound size={22} />} label="Legal Name">{formData.legalName}</PreviewItem>
                  <PreviewItem icon={<Pencil size={22} />} label="DBA">{formData.dba}</PreviewItem>
                  <PreviewItem icon={<Globe2 size={22} />} label="Website">{formData.website}</PreviewItem>
                  <PreviewItem icon={<CalendarDays size={22} />} label="Established">{formData.yearEstablished}</PreviewItem>
                  <PreviewItem icon={<FileText size={22} />} label="EIN / Tax ID">{formData.taxId}</PreviewItem>
                  <PreviewItem icon={<FileText size={22} />} label="Description">{formData.description}</PreviewItem>
                </section>
              </aside>
            </div>

            <footer className="identity-actions">
              <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
              <button type="submit" className="identity-continue">Continue <ArrowRight size={19} /></button>
            </footer>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CompanyIdentityPage;
