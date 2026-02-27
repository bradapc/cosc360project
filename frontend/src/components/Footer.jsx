import React from 'react';
const currentYear = new Date().getFullYear();
function Footer() {
    return (
        <footer id="footer">
            <span id="copyright">© {currentYear} Copyright, </span>
            <span id="github"><a href="https://github.com/bradapc/cosc360project" target="_blank">Github Repo</a></span>
        </footer>
    );
}

export default Footer;