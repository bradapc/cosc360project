import React from 'react';
import '../css/Footer.css';
const currentYear = new Date().getFullYear();
function Footer() {
    return (
        <footer id="footer">
            <span id="copyright">© {currentYear} Copyright, </span>
            <span id="github"><a href="https://github.com/bradapc/cosc360project" target="_blank">Github Repo</a></span>
            <span id="about"><a href="/about">About</a></span>
            <span id="terms-conditions"><a href="/termsconditions">Terms and Conditions</a></span>
        </footer>
    );
}

export default Footer;