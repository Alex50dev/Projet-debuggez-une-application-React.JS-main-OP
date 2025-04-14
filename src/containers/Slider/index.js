import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Vérifier et convertir correctement toutes les dates
  const byDateAsc = (data?.focus || [])
    .map(event => {
      const dateObj = new Date(event.date);
      // Vérifier si la date est valide en utilisant Number.isNaN
      if (Number.isNaN(dateObj.getTime())) { // getTime() retourne NaN si la date est invalide
        return null; // Ignore cet événement si la date est invalide
      }
      return {
        ...event,
        dateObj, // Ajouter l'objet Date validé
      };
    })
    .filter(event => event !== null) // Enlever les événements avec des dates invalides
    .sort((a, b) => b.dateObj - a.dateObj); // Correction : ordre décroissant

  // Passer au slide suivant toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % byDateAsc.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [byDateAsc.length]);

  return (
    <div className="SlideCardList">
      {byDateAsc.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(event.dateObj)}</div> {/* Utilisation de la date valide */}
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc.map((event, radioIdx) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
