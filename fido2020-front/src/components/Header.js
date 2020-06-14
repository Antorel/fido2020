import React from 'react';
import { Link } from 'react-router-dom';

import UserToolbar from '../containers/UserToolbar.js';

const Header = ({ showUserToolbar }) =>
    <header>
        <nav className="navbar navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">
<<<<<<< HEAD
                <h1>Fido 2020</h1>
=======
                <h1>Fido2020</h1>
>>>>>>> 482effbc564c8648d0a3c093ff43f7ba42e4c281
            </Link>
            {showUserToolbar && <UserToolbar />}
        </nav>
    </header>;

export default Header;
