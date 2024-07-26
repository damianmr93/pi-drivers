import { useDispatch } from "react-redux"
import { getDriversByName } from "../../redux/actions"
import { useState } from "react"
import styles from './SearchBar.module.css'

const SearchBar = ({ forCleaningDriversFiltered }) => {
  const [name, setName] = useState("")
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const onSearch = (name) => {
    dispatch(getDriversByName(name))
  }

  const clearHandler = async () => {
    forCleaningDriversFiltered('cleanState', 'clearButton')
    setName("")
  }

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        name="driverName"
        placeholder="Write a driver name"
        value={name}
        onChange={handleChange}
        onClick={() => setName("")}
        className={styles.searchBarInput}
      />

      <button className={styles.searchButton} id="searchButton" onClick={() => onSearch(name)}>🔍</button>

      <button className={styles.clearButton} id="clearButton"  onClick={clearHandler}>❌</button>
    </div>
  )
}

export default SearchBar