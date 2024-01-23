const Input = ({ id, label, onInputChange, ...props }) => {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        {...props}
        onChange={(e) => onInputChange(id, e.target.value)}
      />
    </p>
  );
};

export default Input;
