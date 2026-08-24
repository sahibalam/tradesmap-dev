const InputField = ({
  label, name, type = "text", placeholder, value, onChange, error, icon
}) => (
  <div className="input-group">
    <label htmlFor={name}>{label}</label>
    <div className={`input-wrapper ${error ? "input-error" : ""}`}>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
      {icon && <span className="input-icon">{icon}</span>}
    </div>
    {error && <small className="error-text">{error}</small>}
  </div>
);

export default InputField;