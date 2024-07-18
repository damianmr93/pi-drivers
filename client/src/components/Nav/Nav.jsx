import SearchBar from "../SearchBar/SearchBar"
import { Link } from "react-router-dom"
import styles from './Nav.module.css'

const Nav = ({ forCleaningDriversFiltered }) => {
  
  return (
    <nav className={styles.navContainer}>
      <button>
        <Link to={"/home"}><span className={styles.navSpan}>Home</span></Link>
      </button>

      <button>
        <Link to={"/form"}><span className={styles.navSpan}>Create a driver</span></Link>
      </button>

      <SearchBar forCleaningDriversFiltered={forCleaningDriversFiltered}/>
    </nav>
  )
}

export default Nav