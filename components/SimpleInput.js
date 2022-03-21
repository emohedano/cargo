export default function SimpleInput({ label, value, onChange }) {
  return (
    <>
      <label>{label}</label>
      <input
        className="input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}
