import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  orderByName,
  orderByDob,
  filterByOrigin,
  filterByTeam,
  getTeams,
} from "../../redux/actions"
import styles from "./Filters.module.css"

const Filters = ({ forCleaningDriversFiltered, teamsOptions }) => {
  const teams = useSelector((state) => state.teams)
  const dispatch = useDispatch()

  useEffect(() => {
    teams.length === 0 && dispatch(getTeams())
  }, [])

  const orderByNameHandler = (event) => {
    const sort = event.target.value
    forCleaningDriversFiltered(false, "byName")
    dispatch(orderByName(sort))
  }

  const orderByDobHandler = (event) => {
    const sort = event.target.value
    forCleaningDriversFiltered(false, "byDob")
    dispatch(orderByDob(sort))
  }

  const filterByOriginHandler = (event) => {
    const origin = event.target.value
    forCleaningDriversFiltered(false, "byOrigin")
    dispatch(filterByOrigin(origin))
  }

  const filterByTeamHandler = (event) => {
    const team = event.target.value
    forCleaningDriversFiltered(false, "byTeam")
    dispatch(filterByTeam(team))
  }

  const handleOnClick = () => {
    forCleaningDriversFiltered('cleanState', "clearButton")
  }

  return (
    <section className={styles.containerFilters}>
      <select
        id="orderByName"
        defaultValue="orderByName"
        onChange={orderByNameHandler}>
        <option value="orderByName" disabled>
          Order by name
        </option>
        <option value="A">A to Z</option>
        <option value="D">Z to A</option>
      </select>

      <select
        id="orderByDob"
        defaultValue="orderByDob"
        onChange={orderByDobHandler}>
        <option value="orderByDob" disabled>
          Order by birthdate
        </option>
        <option value="A">Older to younger</option>
        <option value="D">Younger to older</option>
      </select>

      <select
        id="filterByOrigin"
        defaultValue="filterByOrigin"
        onChange={filterByOriginHandler}>
        <option value="filterByOrigin" disabled>
          Filter by origin
        </option>
        <option value="db">Created drivers</option>
        <option value="api">Default drivers</option>
      </select>

      <select
        id="filterByTeam"
        defaultValue="filterByTeam"
        onChange={filterByTeamHandler}>
        <option value="filterByTeam" disabled>
          Filter by team
        </option>
        {teamsOptions(teams, "name")}
      </select>

      <button onClick={handleOnClick} className={styles.filterButton}>
        Clear
      </button>
    </section>
  )
}

export default Filters