import React, { useEffect, useState } from "react";
import {Link, useLocation} from 'react-router-dom'

const Header: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(prev => !prev);
        const timeout = setTimeout(() => setIsLoading(prev => !prev), 500);
        () => clearTimeout(timeout);
    }, [location]);

    return (
    <header>
        <div className="header-container">
            <Link to={'/'}>
                <h1>Podcaster</h1>
            </Link>
            {isLoading && <div className="circle" />}
        </div>
        <hr />
    </header>);
}

export default Header;