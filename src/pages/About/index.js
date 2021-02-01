import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className='container'>
            <p>About text</p>
            <Link to="/">GO Back</Link>
        </div>
    );
};

export default About;
