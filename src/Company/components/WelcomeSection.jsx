import { Users, ShieldCheck, BriefcaseBusiness, Info } from "lucide-react";
import FeatureItem from "./FeatureItem";

const WelcomeSection = () => (
  <section className="welcome-section">
    <div className="welcome-content">
      <h2>Welcome to<br /><span>TradesMap</span> Business</h2>

      <p className="welcome-description">
        Create your Construction Business Identity to access projects,
        build your team, and grow your company.
      </p>

      <div className="features-list">
        <FeatureItem icon={<Users size={30} />} title="Access quality opportunities"
          description="matched to your capabilities" />
        <FeatureItem icon={<ShieldCheck size={30} />} title="Build your reputation"
          description="and win more work" />
        <FeatureItem icon={<BriefcaseBusiness size={30} />} title="Manage your team"
          description="and projects in one place" />
      </div>

      <div className="signin-box">
        <div className="signin-info">
          <Info size={28} />
          <div>
            <strong>Already have an account?</strong>
            <small>Sign in to your existing account to continue.</small>
          </div>
        </div>
        <a href="#signin" className="signin-button">Sign In</a>
      </div>
    </div>

    <div className="construction-image">
      <img src="/assets/Login_Page_Ref_Image.jpeg" alt="Construction professionals" />
    </div>
  </section>
);

export default WelcomeSection;