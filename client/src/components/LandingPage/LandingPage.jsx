import { Link } from 'react-router-dom'
import style from './LandingPage.module.css'

const LandingPage = () => {
    return(
        <div className={style.container}>
            <section className={style.section}>
                <h1 className={style.tittle}>Driver Race Finder</h1>
                <Link to={'/home'}><button className={style.button}>Access</button></Link>
                <p className={style.description}>Find and create your favorite race drivers easily and quickly. Explore them based on their name, teams and more... You can also create your own driver!</p>
            </section>
        </div>
    )
}

export default LandingPage