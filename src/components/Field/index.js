import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder }) => {
  const fieldId = `field-${name || Math.random().toString(36).substr(2, 9)}`;
  
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          id={fieldId}
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          aria-label={label}
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea 
          id={fieldId}
          name={name} 
          data-testid="field-testid"
          aria-label={label}
          placeholder={placeholder}
        />
      );
      break;
    default:
      component = (
        <input
          type="text"
          id={fieldId}
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          aria-label={label}
        />
      );
  }
  return (
    <div className="inputField">
      {label && <label htmlFor={fieldId}>{label}</label>}
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

Field.defaultProps = {
  type: FIELD_TYPES.INPUT_TEXT,
  label: "",
  name: "",
  placeholder: "",
};

export default Field;
