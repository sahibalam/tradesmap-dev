import { ShieldCheck } from "lucide-react";

const Header = () => (
  <header className="top-header">
    <div className="logo">
      <img className="logo-icon" src="/assets/tradesmap-logo.png" alt="TradesMap logo" />
      <span>Trades<span>Map</span></span>
    </div>

    <div className="security-info">
      <ShieldCheck size={34} />
      <div>
        <strong>Your information is secure</strong>
        <small>and never shared without your permission</small>
      </div>
    </div>
  </header>
);

export default Header;