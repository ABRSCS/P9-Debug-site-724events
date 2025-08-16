import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./style.scss";

const Modal = ({ opened, setOpened, Content, children }) => {
  const [internalOpened, internalSetOpened] = useState(opened || false);

  const isControlled = opened !== undefined && setOpened !== undefined;

  // Synchronise l'état interne avec la prop opened si mode contrôlé
  useEffect(() => {
    if (isControlled) {
      internalSetOpened(opened);
    }
  }, [opened, isControlled]);
  
  // Choix du booléen d'ouverture
  const isOpened = isControlled ? opened : internalOpened;
  // Choix de la fonction pour modifier l'ouverture
  const toggleOpened = isControlled ? setOpened : internalSetOpened;

  // Gestion du clic sur l'overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleOpened(false);
    }
  };

  // Gestion de la touche Escape
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      toggleOpened(false);
    }
  };
  
  return (
    <>
      {children({ isOpened, setIsOpened: toggleOpened })}
      {isOpened && (
        <div className="modal">
          <button
            className="modal-overlay"
            onClick={handleOverlayClick}
            onKeyDown={handleKeyDown}
            aria-label="Fermer la modal"
            type="button"
          />
          <div className="content">
            {Content}
            <button
              type="button"
              data-testid="close-modal"
              onClick={() => toggleOpened(false)}
              aria-label="Fermer la modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  opened: false,
  setOpened: undefined,
};

Modal.propTypes = {
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
};

export default Modal;
