import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Mémoisation du tri des données pour éviter les recalculs
  const byDateDesc = useMemo(() => {
    if (!data?.focus) return [];
    return [...data.focus].sort(
      (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
    );
  }, [data?.focus]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Fonction pour avancer automatiquement
  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    if (byDateDesc.length > 0 && !isHovered) {
      intervalRef.current = setInterval(() => {
        setIndex(prev => (prev < byDateDesc.length - 1 ? prev + 1 : 0));
      }, 5000);
    }
  }, [byDateDesc.length, isHovered, stopAutoSlide]);

  // Gestion du clic manuel
  const handleManualClick = useCallback((newIndex) => {
    setIndex(newIndex);
    stopAutoSlide();
    setTimeout(() => {
      if (!isHovered) {
        startAutoSlide();
      }
    }, 1000);
  }, [isHovered, startAutoSlide, stopAutoSlide]);

  // Gestion du survol
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    stopAutoSlide();
  }, [stopAutoSlide]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    startAutoSlide();
  }, [startAutoSlide]);

  // Lancement au montage et restart à chaque changement de données
  useEffect(() => {
    if (byDateDesc.length > 0) {
      startAutoSlide();
    }
    return stopAutoSlide;
  }, [byDateDesc.length, startAutoSlide, stopAutoSlide]);

  // Si pas encore de données
  if (byDateDesc.length === 0) {
    return <div className="SlideCardList">Chargement...</div>;
  }

  return (
    <div 
      className="SlideCardList"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {byDateDesc.map((event, idx) => (
        <div 
          key={`slide-${event.id || event.title}-${event.date}`}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.title || "visuel événement"} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination - en dehors de la boucle des slides */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((radioEvent, radioIdx) => (
            <input
              key={`radio-${radioEvent.id || radioEvent.title}-${radioEvent.date}`}
              type="radio"
              name="slider-radio"
              checked={index === radioIdx}
              readOnly
              onClick={() => handleManualClick(radioIdx)}
              aria-label={`Aller au slide ${radioIdx + 1} : ${radioEvent.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;