const Input = ({ id, label, onInputChange, ...props }) => {
  return (
    <p className="control">
      <label>{label}</label>
      <input
        {...props}
        onChange={(e) => onInputChange(id, e.target.value)}
      />
    </p>
  );
};

export default Input;
