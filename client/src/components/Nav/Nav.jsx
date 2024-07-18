import SearchBar from "../SearchBar/SearchBar"
import { Link } from "react-router-dom"
import styles from './Nav.module.css'

const Nav = ({ forCleaningDriversFiltered }) => {
  
  return (
    <nav className={styles.navContainer}>
      <button>
        <Link to={"/home"}>Home</Link>
      </button>

      <button>
        <Link to={"/form"}>Create a driver</Link>
      </button>

      <SearchBar forCleaningDriversFiltered={forCleaningDriversFiltered}/>
    </nav>
  )
}

export default Nav