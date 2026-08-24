const FeatureItem = ({ icon, title, description }) => (
  <div className="feature-item">
    <div className="feature-icon">{icon}</div>
    <div className="feature-content">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

export default FeatureItem;