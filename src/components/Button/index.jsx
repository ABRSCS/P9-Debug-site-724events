import PropTypes from "prop-types";

import "./style.scss";

export const BUTTON_TYPES = {
  DEFAULT: 1,
  SUBMIT: 2,
};

const Button = ({ title, onClick, type, disabled, children }) => {
  switch (type) {
    case BUTTON_TYPES.DEFAULT:
      return (
        <button
          type="button"
          disabled={disabled}
          className="Button"
          data-testid="button-test-id"
          onClick={onClick}
          title={title}
          aria-label={title || (typeof children === 'string' ? children : 'Bouton')}
        >
          {children}
        </button>
      );
    case BUTTON_TYPES.SUBMIT:
      return (
        <input
          disabled={disabled}
          className="Button"
          type="submit"
          data-testid="button-test-id"
          value={children}
          onClick={onClick}
          title={title}
          aria-label={title || (typeof children === 'string' ? children : 'Soumettre')}
        />
      );
    default:
      return (
        <button
          type="button"
          disabled={disabled}
          className="Button"
          data-testid="button-test-id"
          onClick={onClick}
          title={title}
          aria-label={title || (typeof children === 'string' ? children : 'Bouton')}
        >
          {children}
        </button>
      );
  }
};

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.number,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

Button.defaultProps = {
  disabled: false,
  onClick: () => null,
  type: BUTTON_TYPES.DEFAULT,
  title: "",
  children: null,
};

export default Button;
