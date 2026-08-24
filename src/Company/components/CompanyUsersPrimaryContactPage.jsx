import {
  Info,
  LockKeyhole,
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  UserRound,
  UsersRound,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import "../styles/companyUsersPrimaryContactPage.css";

const steps = [
  "Welcome",
  "Company Identity",
  "Company Type & How You Use TradesMap",
  "Construction Capabilities",
  "Service Area",
  "Company Users & Primary Contact",
  "Documents & Qualifications",
];
const users = [
  {
    name: "Jennifer Lee",
    email: "jennifer.lee@sunrisebuilders.com",
    role: "Project Manager",
    image: "/assets/FemaleUser.png",
  },
  {
    name: "David Martinez",
    email: "david.martinez@sunrisebuilders.com",
    role: "Estimator",
    image: "/assets/MaleUser.png",
  },
];
const StepList = () => (
  <ol className="step-list">
    {steps.map((s, i) => (
      <li key={s} className={i < 5 ? "complete" : i === 5 ? "active" : ""}>
        <div className="step-dot">{i < 5 ? "✓" : i + 1}</div>
        <div>
          <strong>{s}</strong>
          <small>{i < 5 ? "Completed" : i === 5 ? "In Progress" : ""}</small>
        </div>
      </li>
    ))}
  </ol>
);
export default function CompanyUsersPrimaryContactPage({
  profile,
  onBack,
  onContinue,
}) {
  const name =
    `${profile?.firstName || "Nishant"} ${profile?.lastName || "Rodriguez"}`.trim();
  const email = profile?.email || "nishant.rodriguez@sunrisebuilders.com";
  return (
    <div className="users-page">
      <div className="users-security">
        <LockKeyhole size={22} />
        <span>
          <strong>Your information is secure</strong>
          <small>and never shared without your permission.</small>
        </span>
      </div>
      <div className="users-shell">
        <aside className="users-sidebar">
          <StepList />
          <div className="users-help">
            <Headphones />
            <strong>Need Help?</strong>
            <p>Our support team is here to assist you.</p>
            <button>Contact Support</button>
          </div>
        </aside>
        <div className="users-workspace">
          <main className="users-main">
            <section className="users-content">
              <h1>Company Users &amp; Primary Contact</h1>
              <p className="users-intro">
                Invite your team members and set a primary contact for your
                account.
              </p>
              <h2>Primary Contact (Account Owner)</h2>
              <article className="owner-card">
                <img src="/assets/primaryOwner.png" alt="Account owner" />
                <div className="owner-fields">
                  <label>
                    Full Name
                    <input value={name} readOnly />
                  </label>
                  <label>
                    Designation
                    <input value="Operations Manager" readOnly />
                  </label>
                  <label>
                    Email
                    <input value={email} readOnly />
                  </label>
                  <label>
                    Phone
                    <div className="phone-input">
                      <span>🇺🇸⌄</span>
                      <input value="(215) 555-8726" readOnly />
                    </div>
                  </label>
                </div>
              </article>
              <h2 className="additional-title">
                Additional Users <em>(optional)</em>
              </h2>
              <div className="user-list">
                {users.map((u, index) => (
                  <article key={u.email} className="user-card">
                    <img src={u.image} alt={u.name} />
                    <div className="user-fields">
                      <label>
                        Invite Full Name
                        <input value={u.name} readOnly />
                      </label>
                      <label>
                        Designation / Role
                        <div className="select-like">
                          {u.role}
                          <span>⌄</span>
                        </div>
                      </label>
                      <label>
                        Email
                        <input value={u.email} readOnly />
                      </label>
                    </div>
                    <button className="delete" aria-label={`Delete ${u.name}`}>
                      <Trash2 size={20} />
                    </button>
                  </article>
                ))}
              </div>
              <button className="invite-wide">
                <Plus size={21} />
                Invite Another User
              </button>
            </section>
            <aside className="users-aside">
              <div className="ask-card">
                <Info />
                <h3>Why we ask this</h3>
                <p>
                  Adding your team members helps you collaborate better and
                  manage your projects efficiently on TradesMap.
                </p>
              </div>
              <div className="aside-item">
                <UserRound />
                <div>
                  <h3>Primary Contact</h3>
                  <p>
                    This person will be the main point of contact and account
                    owner.
                  </p>
                </div>
              </div>
              <div className="aside-item">
                <UsersRound />
                <div>
                  <h3>Additional Users</h3>
                  <p>
                    You can invite team members with specific roles and
                    permissions.
                  </p>
                </div>
              </div>
              <div className="aside-item">
                <ShieldCheck />
                <div>
                  <h3>Secure &amp; Private</h3>
                  <p>We keep your information safe and secure.</p>
                </div>
              </div>
            </aside>
          </main>
          <footer className="users-actions">
            <button onClick={onBack}>
              <ArrowLeft size={17} />
              Back
            </button>
            <button className="primary" onClick={onContinue}>
              Continue
              <ArrowRight size={17} />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
