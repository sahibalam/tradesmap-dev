import { Component, Suspense, lazy, useCallback, useEffect, useState } from "react";
import LoginPage from "./Company/components/LoginPage";

const CompanyIdentityPage = lazy(() => import("./Company/components/CompanyIdentityPage"));
const CompanyTypePage = lazy(() => import("./Company/components/CompanyTypePage"));
const ConstructionCapabilitiesPage = lazy(() => import("./Company/components/ConstructionCapabilitiesPage"));
const ServiceAreaPage = lazy(() => import("./Company/components/ServiceAreaPage"));
const CompanyUsersPrimaryContactPage = lazy(() => import("./Company/components/CompanyUsersPrimaryContactPage"));
const DocumentsQualificationsPage = lazy(() => import("./Company/components/DocumentsQualificationsPage"));
const DashboardPage = lazy(() => import("./Company/components/DashboardPage"));

const STEPS = {
  WELCOME: "welcome",
  COMPANY_IDENTITY: "company-identity",
  COMPANY_TYPE: "company-type",
  CONSTRUCTION_CAPABILITIES: "construction-capabilities",
  SERVICE_AREA: "service-area",
  COMPANY_USERS: "company-users",
  DOCUMENTS_QUALIFICATIONS: "documents-qualifications",
  DASHBOARD: "dashboard",
};

// Every registration screen has a readable URL.
const STEP_PATHS = {
  [STEPS.WELCOME]: "/company/registration",
  [STEPS.COMPANY_IDENTITY]: "/company/registration",
  [STEPS.COMPANY_TYPE]: "/company/registration",
  [STEPS.CONSTRUCTION_CAPABILITIES]: "/company/registration",
  [STEPS.SERVICE_AREA]: "/company/registration",
  [STEPS.COMPANY_USERS]: "/company/registration",
  [STEPS.DOCUMENTS_QUALIFICATIONS]: "/company/registration",
  [STEPS.DASHBOARD]: "/company/dashboard",
};

const getStepFromPath = (pathname) => {
  const normalized = pathname.replace(/\/+$/, "") || "/registration";
  return Object.entries(STEP_PATHS).find(([, path]) => path === normalized)?.[0] || STEPS.WELCOME;
};

class PageErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: "Arial, sans-serif", color: "#1f2937" }}>
          <h2>Page could not be loaded</h2>
          <p>Please check the browser console for the technical error.</p>
          <pre style={{ whiteSpace: "pre-wrap", color: "#b91c1c" }}>
            {this.state.error.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  // Read the URL first, so direct links such as /registration/serviceArea also open the correct page.
  const [currentStep, setCurrentStep] = useState(() => getStepFromPath(window.location.pathname));
  const [profile, setProfile] = useState(null);

  const goToStep = useCallback((step, replace = false) => {
    const nextPath = STEP_PATHS[step];
    if (!nextPath) return;

    if (window.location.pathname !== nextPath) {
      window.history[replace ? "replaceState" : "pushState"]({}, "", nextPath);
    }

    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Browser Back and Forward buttons stay synchronized with the page UI.
  useEffect(() => {
    const handlePopState = () => {
      setCurrentStep(getStepFromPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Opening the old root URL should immediately use the new registration URL.
  useEffect(() => {
    if (window.location.pathname === "/") {
      goToStep(STEPS.WELCOME, true);
    }
  }, [goToStep]);

  let page;

  switch (currentStep) {
    case STEPS.COMPANY_IDENTITY:
      page = <CompanyIdentityPage onCancel={() => goToStep(STEPS.WELCOME)} onContinue={() => goToStep(STEPS.COMPANY_TYPE)} />;
      break;

    case STEPS.COMPANY_TYPE:
      page = <CompanyTypePage onBack={() => goToStep(STEPS.COMPANY_IDENTITY)} onContinue={() => goToStep(STEPS.CONSTRUCTION_CAPABILITIES)} />;
      break;

    case STEPS.CONSTRUCTION_CAPABILITIES:
      page = <ConstructionCapabilitiesPage onBack={() => goToStep(STEPS.COMPANY_TYPE)} onContinue={() => goToStep(STEPS.SERVICE_AREA)} />;
      break;

    case STEPS.SERVICE_AREA:
      page = <ServiceAreaPage onBack={() => goToStep(STEPS.CONSTRUCTION_CAPABILITIES)} onContinue={() => goToStep(STEPS.COMPANY_USERS)} />;
      break;

    case STEPS.COMPANY_USERS:
      page = <CompanyUsersPrimaryContactPage profile={profile} onBack={() => goToStep(STEPS.SERVICE_AREA)} onContinue={() => goToStep(STEPS.DOCUMENTS_QUALIFICATIONS)} />;
      break;

    case STEPS.DOCUMENTS_QUALIFICATIONS:
      page = <DocumentsQualificationsPage onBack={() => goToStep(STEPS.COMPANY_USERS)} onFinish={() => goToStep(STEPS.DASHBOARD)} />;
      break;

    case STEPS.DASHBOARD:
      page = <DashboardPage />;
      break;

    case STEPS.WELCOME:
    default:
      page = <LoginPage onContinue={(data) => { setProfile(data); goToStep(STEPS.COMPANY_IDENTITY); }} />;
  }

  return (
    <PageErrorBoundary resetKey={currentStep}>
      <Suspense fallback={<div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>Loading...</div>}>
        {page}
      </Suspense>
    </PageErrorBoundary>
  );
}

export default App;
