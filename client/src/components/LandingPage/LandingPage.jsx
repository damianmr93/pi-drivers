import { Link } from 'react-router-dom'
import style from './LandingPage.module.css'

const LandingPage = () => {
    return(
        <div className={style.container}>
            <section className={style.section}>
                <h1 className={style.tittle}>Racing Drivers Hub</h1>
                <Link to={'/home'}><button className={style.button}>Access</button></Link>
                <p className={style.description}>Welcome to the Ultimate Drivers Hub! Explore, search, and find your favorite drivers effortlessly. Whether you're looking for the newest additions or seasoned professionals, our comprehensive database has you covered. Start your journey now and discover the driver that matches your needs and preferences!</p>
            </section>
        </div>
    )
}

export default LandingPage