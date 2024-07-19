import { useState } from "react"
import styles from './Pagination.module.css'

const Pagination = ({ page, setPage, numberOfPages }) => {
  const [input, setInput] = useState(1)
  const [inputAux, setInputAux] = useState(0)

  const previousPage = () => {
    setInput(+input - 1)
    setPage(page - 1)
  }

  const nextPage = () => {
    setInput(+input + 1)
    setPage(page + 1)
  }

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      const requestedPage = +event.target.value

      if (requestedPage <= 1 || isNaN(requestedPage)) {
        setPage(1)
        setInput(1)
        return

      } else if (requestedPage > numberOfPages) {
        setInput(numberOfPages)
        setPage(numberOfPages)
        return
      }
      
      setPage(requestedPage)
    }
  }

  const onChange = (event) => {
    setInput(event.target.value)
  }

  const handleOnClick = () => {
    setInputAux(input)
    setInput('')
  }
  
  const handleBlur = () => {
    if(input === '') setInput(inputAux)
  }

  const handleOnKeyDown = (event) => {
    event.key === 'ArrowLeft' && document.getElementById('arrowLeft').click()
    event.key === 'ArrowRight' && document.getElementById('arrowRight').click()
  }

  return (
    <div className={styles.paginationContainer}>
      <button id="arrowLeft" onKeyDown={handleOnKeyDown} className={styles.rightButton} disabled={page <= 1} onClick={previousPage}>◀️</button>

      <input
        type="text"
        value={input}
        name="page"
        onChange={(event) => onChange(event)}
        onKeyDown={(event) => onKeyDown(event)}
        onBlur={handleBlur}
        onClick={handleOnClick}
      />

      <span className={styles.paginationSpan}>of {numberOfPages}</span>

      <button id="arrowRight" onKeyDown={handleOnKeyDown} className={styles.leftButton} disabled={page >= numberOfPages} onClick={nextPage}>▶️</button>
    </div>
  )
}

export default Pagination