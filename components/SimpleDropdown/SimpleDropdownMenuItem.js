export default function SimpleDropdownMenuItem({ label, children }) {
  return (
    <a href="#" className="dropdown-item">
      {children || label}
    </a>
  );
}
