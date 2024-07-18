import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ id, image, name, teams, dob, teamsFormat }) => {
  // Comprobación de existencia de propiedades antes de su uso
  const imageUrl = image?.url ?? "";
  const forename = name?.forename ?? "Unknown";
  const surname = name?.surname ?? "Unknown";

  return (
    <li className={styles.card}>
      <Link to={`/detail/${id}`}>
        {imageUrl && <img className={styles.img} src={imageUrl} alt={`${forename} ${surname}`} />}
      </Link>
      <Link to={`/detail/${id}`}>
        <h2>{name.forename} {name.surname}</h2>
      </Link>
      <p className={styles.cardTeams}>Teams: {teamsFormat(id, teams)}</p>
    </li>
  );
};

export default Card;
