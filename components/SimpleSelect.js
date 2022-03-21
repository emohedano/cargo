function createOptions(collection) {
  return collection.map((item) => {
    return (
      <option value={item} key={item}>
        {item}
      </option>
    );
  });
}

export default function SimpleSelect({ label, options, value, onChange }) {
  return (
    <>
      <label>{label}</label>
      <div>
        <div className="select">
          <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option>Select option</option>
            {createOptions(options)}
          </select>
        </div>
      </div>
    </>
  );
}
