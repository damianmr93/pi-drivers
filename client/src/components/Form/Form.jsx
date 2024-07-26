import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, getDrivers, postDriver, cleanDrivers, cleanDriversFiltered } from "../../redux/actions";
import validation from '../validations/formValidations';
import axios from "axios";
import styles from './Form.module.css';

const Form = ({ teamsOptions, forCleaningDriversFiltered }) => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const drivers = useSelector((state) => state.drivers);

  const [count, setCount] = useState(1);
  const [newDriver, setNewDriver] = useState({
    name: {
      plainForename: "",
      plainSurname: "",
    },
    description: "",
    image: {
      url: "",
    },
    nationality: "",
    dob: "",
    teamsId: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (teams.length === 0) dispatch(getTeams());
    if (drivers.length === 0) dispatch(getDrivers());
  }, [dispatch, teams, drivers]);

  const uniqueNationalities = new Set();
  const filteredNationalities = drivers.filter((driver) => {
    if (!uniqueNationalities.has(driver.nationality)) {
      uniqueNationalities.add(driver.nationality);
      return true;
    }
    return false;
  });

  const nationalityOption = () => {
    return filteredNationalities
      .sort((a, b) => a.nationality.localeCompare(b.nationality))
      .map((driver) => (
        <option key={driver.id} value={driver.nationality}>
          {driver.nationality}
        </option>
      ));
  };

  const handleAddTeamButton = () => {
    setCount(count + 1);
  };

  const handleRemoveTeamButton = () => {
    if (count > 1) {
      setCount(count - 1);
      setNewDriver((prevDriver) => {
        const newTeamsId = [...prevDriver.teamsId];
        newTeamsId.pop();
        return { ...prevDriver, teamsId: newTeamsId };
      });
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;

    if (id === "plainForename" || id === "plainSurname") {
      setNewDriver((prevDriver) => ({
        ...prevDriver,
        name: {
          ...prevDriver.name,
          [id]: value,
        },
      }));

      setErrors(validation({
        ...newDriver,
        name: {
          ...newDriver.name,
          [id]: value,
        },
      }));
    } else if (id === "description" || id === "nationality" || id === "dob") {
      setNewDriver((prevDriver) => ({
        ...prevDriver,
        [id]: value,
      }));

      setErrors(validation({
        ...newDriver,
        [id]: value,
      }));
    } else if (id === "url") {
      setNewDriver((prevDriver) => ({
        ...prevDriver,
        image: {
          ...prevDriver.image,
          url: value,
        },
      }));
    } else if (id.includes("teams")) {
      const index = parseInt(id.replace("teams", ""), 10);
      const newTeamsId = [...newDriver.teamsId];
      newTeamsId[index] = parseInt(value, 10);

      setNewDriver((prevDriver) => ({
        ...prevDriver,
        teamsId: newTeamsId,
      }));

      setErrors(validation({
        ...newDriver,
        teamsId: newTeamsId,
      }));
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length >= 1) {
      window.alert('You are missing data or the data was introduced incorrectly');
      return;
    }

    window.alert('Created successfully!');
    const driverData = {
      ...newDriver,
      isCreated: true,
    };

    try {
      await axios.post("http://localhost:3001/drivers", driverData);
      forCleaningDriversFiltered('cleanState', 'clearButton');
      dispatch(getDrivers());
    } catch (error) {
      console.error("Error creating driver:", error.message);
    }
  };


  return (
    <section className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="plainForename" title={errors.forename ? errors.forename : "It must not be empty and not have any symbols"}>Forename: </label>
          <input
            required
            value={newDriver.name.plainForename}
            onChange={handleChange}
            placeholder="Driver forename"
            id="plainForename"
            type="text"
            title={errors.forename ? errors.forename : "It must not be empty and not have any symbols"}
            autoFocus
          />
          {errors.forename && <span title={errors.forename} style={{ color: 'black' }}>*</span>}
        </div>

        <div>
          <label title={errors.surname ? errors.surname : "It must not be empty and not have any symbols"} htmlFor="plainSurname">Surname: </label>
          <input
            required
            value={newDriver.name.plainSurname}
            onChange={handleChange}
            type="text"
            placeholder="Driver surname"
            id="plainSurname"
            title={errors.surname ? errors.surname : "It must not be empty and not have any symbols"}
          />
          {errors.surname && <span title={errors.surname} style={{ color: 'black' }}> *</span>}
        </div>

        <div>
          <label title={errors.nationality ? errors.nationality : 'You must select a nationality'} htmlFor="nationality">Nationality: </label>
          <select
            required
            onChange={handleChange}
            value={newDriver.nationality}
            id="nationality"
            title={errors.nationality ? errors.nationality : 'You must select a nationality'}
          >
            <option value="selectNationality">Select nationality</option>
            {nationalityOption()}
          </select>
          {errors.nationality && <span title={errors.nationality} style={{ color: 'black' }}> *</span>}
        </div>

        <div>
          <label title="Paste your url" htmlFor="url">Image: </label>
          <input
            title="Paste your url"
            value={newDriver.image.url}
            onChange={handleChange}
            placeholder="Paste your image url"
            type="url"
            id="url"
          />
        </div>

        <div>
          <label title={errors.dob ? errors.dob : 'You must introduce the birthdate'} htmlFor="dob">Birthdate: </label>
          <input
            required
            type="date"
            id="dob"
            value={newDriver.dob}
            onChange={handleChange}
            title={errors.dob ? errors.dob : 'You must introduce the birthdate'}
          />
          {errors.dob && <span title={errors.dob} style={{ color: 'black' }}> *</span>}
        </div>

        <div>
          <div>
            <label title={errors.description ? errors.description : 'You must introduce a description'} htmlFor="description">Description</label>
            {errors.description && <span title={errors.description} style={{ color: 'black' }}> *</span>}
          </div>
          <textarea
            className={styles.description}
            required
            value={newDriver.description}
            onChange={handleChange}
            id="description"
            title={errors.description ? errors.description : 'You must introduce a description'}
          />
        </div>

        <div className={styles.teams}>
          <div>
            <label title={errors.team ? errors.team : 'You must introduce a team'} htmlFor={`teams${count - 1}`}>Teams</label>
            {errors.team && <span title={errors.team} style={{ color: 'black' }}> *</span>}
          </div>
          {[...Array(count)].map((_, i) => (
            <select
              required
              key={i}
              id={`teams${i}`}
              defaultValue="selectTeams"
              title={errors.team ? errors.team : 'You must introduce a team'}
              onChange={handleChange}
            >
              <option value="selectTeams">Select teams</option>
              {teamsOptions(teams, 'id')}
            </select>
          ))}
        </div>

        <div className={styles.teamButtons}>
          <button
            disabled={count <= 1}
            type="button"
            onClick={handleRemoveTeamButton}>
            ➖
          </button>
          <button type="button" onClick={handleAddTeamButton}>
            ➕
          </button>
        </div>

        <button disabled={Object.keys(errors).length >= 1}>Create driver</button>
      </form>
    </section>
  );
};

export default Form;
