import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Copie et tri décroissant par date
  const byDateDesc = [...(data?.focus || [])].sort(
    (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
  );

  useEffect(() => {
    if (byDateDesc && byDateDesc.length > 0) {
      const timeoutId = setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
    return () => clearTimeout(timeoutId);
    }
    return undefined
    
  }, [index, byDateDesc.length]);

  if (!byDateDesc || byDateDesc.length === 0) {
    return <div className="SlideCardList">Chargement...</div>;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div key={`slide-${event.id || event.title}-${event.date}`}>
          <div
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

        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((radioEvent, radioIdx) => (
            <input
              key={`radio-${radioEvent.id || radioEvent.title}-${radioEvent.date}`}
              type="radio"
              name="slider-radio"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;