import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useState, useEffect } from "react";
import { getDrivers } from "../../redux/actions";
import styles from './Cards.module.css';

const Cards = ({ teamsFormat }) => {
  const drivers = useSelector((state) => state.drivers);
  let driversFiltered = useSelector((state) => state.driversFiltered);
  const dispatch = useDispatch();

  useEffect(() => {
    drivers.length === 0 && dispatch(getDrivers()); // Verifica si drivers tiene longitud 0 y llama a dispatch para obtener los datos
  }, [dispatch, drivers, driversFiltered]);

  const [page, setPage] = useState(1);
  const driversPerPage = 9;
  const driversForShow = driversFiltered.length > 0 ? driversFiltered.length : drivers.length;
  const numberOfPages = Math.ceil(driversForShow / driversPerPage);

  const firstOfThePage = (page - 1) * driversPerPage; // La página -1 es porque page inicia en 1, y yo necesito el indice 0, que es el primero
  const lastOfThePage = (page - 1) * driversPerPage + driversPerPage;

  const renderCard = (card) => {
    return card
      .slice(firstOfThePage, lastOfThePage)
      .map(({ id, image, name, teams, dob }, index) => {
        return (
          <Card key={`${id}-${index}`} id={id} image={image} name={name} teams={teams} dob={dob} teamsFormat={teamsFormat} />
        );
      });
  };

  const renderCardHandler = () => {
    return (
      driversFiltered.length > 0
        ? renderCard(driversFiltered)
        : renderCard(drivers)
    );
  };

  return (
    <section className={styles.CardsPagcontainer}>
      <ul className={styles.cardsContainer}>{renderCardHandler()}</ul>
      <Pagination page={page} setPage={setPage} numberOfPages={numberOfPages} />
    </section>
  );
};

export default Cards;
