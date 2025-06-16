import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  periode, //  Ajouté ici
  ...props
}) => (
  <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`}
    {...props}
  >
    <div className="EventCard__imageContainer">
      <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      <div className="EventCard__label">{label}</div>
    </div>
    <div className="EventCard__descriptionContainer">
      <div className="EventCard__title">{title}</div>
      {/*  Affiche le mois extrait de la période, sinon fallback sur getMonth(date) */}
      <div className="EventCard__month">
        {periode ? periode.split(" ").pop() : getMonth(date)}
      </div>
    </div>
  </div>
);

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
  periode: PropTypes.string, // Ajouté ici
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
  periode: "", // Valeur par défaut
};

export default EventCard;
