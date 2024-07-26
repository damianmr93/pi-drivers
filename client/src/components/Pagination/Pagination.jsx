import styles from './Pagination.module.css'

const Pagination = ({ page, setPage, numberOfPages }) => {

  const previousPage = () => {
    setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }


  return (
    <div className={styles.paginationContainer}>

      <button id="arrowLeft" className={styles.rightButton} disabled={page <= 1} onClick={previousPage}>◀️</button>

      <span className={styles.paginationSpan}> {page} of {numberOfPages}</span>

      <button id="arrowRight" className={styles.leftButton} disabled={page >= numberOfPages} onClick={nextPage}>▶️</button>
      
    </div>
  )
}

export default Pagination