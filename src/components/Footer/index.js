import React  from 'react';
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import moment from 'moment';

const Footer = () => {

    return (
        <footer>
            <p>Copyright &copy; <Moment date={moment().format("YYYY")} format="YYYY" /></p>
            <Link to="/about">About</Link>
        </footer>
    );
};

export default Footer;
