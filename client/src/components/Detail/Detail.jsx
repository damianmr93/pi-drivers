import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDetail, cleanDetail } from "../../redux/actions";
import styles from "./Detail.module.css";

const Detail = ({ teamsFormat }) => {
  const driver = useSelector((state) => state.driverDetail);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => dispatch(cleanDetail());
  }, [id, dispatch]);

  if (!driver || Object.keys(driver).length === 0) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  const { image, name, nationality, description, dob, teams } = driver;

  return (
    <div className={styles.detailContainer}>
      <section className={styles.detail}>
        <img
          className={styles.detailImage}
          src={image?.url}
          alt={`${name?.forename} ${name?.surname}`}
        />

        <div className={styles.detailInfo}>
          <h2>ID: {id}</h2>
          <h2>Name: {name?.forename} {name?.surname}</h2>
          <p><span>Nationality: </span>{nationality}</p>
          <p><span>Birthdate: </span>{dob}</p>
          <p><span>Teams: </span>{teamsFormat(id, teams)}</p>
          <p className={styles.detailDescription}><span>Description: </span>{description}</p>
        </div>
      </section>
    </div>
  );
};

export default Detail;
