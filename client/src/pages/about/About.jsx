import classes from './About.module.css';

const About = () => {
  return (
    <div className={classes.container}>
        <div className={classes.content}>
            <div className={classes.user}>
                <img src="https://avatars.githubusercontent.com/u/93966385?v=4" alt="Adil Ahamad" />
                <span>Adil Ahamad</span>
            </div>
            <p>Hi, I am Adil Ahamad, I am a software engineer. This is my personal project which is develop with MERN (MongoDB, Express, React and Node) stack. This is a awesome project, you can use my source code for learning purpose. In this project, I have used Google authentication, Email verification, JWT (Json Web Token) for authentication. Also used MongoDB for database and manage relationship with the help of Mongoose library. And in the frontend part, I used React and for managing app wide state, I used Redux library.</p>
            <span>Thank you!</span>
        </div>
    </div>
  )
}

export default About