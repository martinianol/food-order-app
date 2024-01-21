const Button = ({ children, textOnly, className }) => {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses +=  " " + className;
  console.log("cssClasses", cssClasses)

  return <button className={cssClasses}>{children}</button>;
};

export default Button;
