export default function FieldPreview({ label, value, ...other }) {
  const { valueClasses } = other;

  return (
    <div>
      <div className="is-capitalized	has-text-grey-light">{label}</div>
      <div className={`is-capitalized	${valueClasses}`}>{value}</div>
    </div>
  );
}
