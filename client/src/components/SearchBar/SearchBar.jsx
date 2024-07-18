import { useDispatch } from "react-redux"
import { getDriversByName, getDriverById, getDrivers, cleanDriversFiltered } from "../../redux/actions"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import styles from './SearchBar.module.css'

const SearchBar = ({ forCleaningDriversFiltered }) => {
  const [name, setName] = useState("")
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const onSearch = (name) => {
    dispatch(getDriversByName(name))
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //event.preventDefault()
      document.getElementById("searchButton").click()
    }
  }

  const handleDisabled = () => {
    const urlId = pathname.split("/")[2]

    return pathname !== "/form" &&
      pathname !== "/about" &&
      pathname !== `/detail/${urlId}`
      ? false
      : true
  }

  const clearHandler = async () => {
    /* forCleanDriversFiltered() */
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
        onKeyDown={handleKeyDown}
        disabled={handleDisabled()}
        onClick={() => setName("")}
        className={styles.searchBarInput}
      />

      <button className={styles.searchButton} id="searchButton" onClick={() => onSearch(name)} disabled={handleDisabled()}>🔍</button>

      <button className={styles.clearButton} id="clearButton" disabled={handleDisabled()} onClick={clearHandler}>❌</button>
    </div>
  )
}

export default SearchBar