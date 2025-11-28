import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, username, onLogout }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="nav">
            <div className="nav-left">
                <Link to="/" className="nav-brand">🚀 Трекер технологий</Link>
                <Link className={isActive('/technologies') ? 'active' : ''} to="/technologies">Все технологии</Link>
                <Link className={isActive('/add-technology') ? 'active' : ''} to="/add-technology">Добавить</Link>
                <Link className={isActive('/search') ? 'active' : ''} to="/search">Поиск    </Link>
                <Link className={isActive('/statistics') ? 'active' : ''} to="/statistics">Статистика</Link>
                <Link className={isActive('/settings') ? 'active' : ''} to="/settings">Настройки</Link>
            </div>

            <div className="nav-right">
                {isLoggedIn ? (
                    <>
                        <span className="nav-user">Привет, {username}</span>
                        <button className="btn-logout" onClick={onLogout}>Выйти</button>
                    </>
                ) : (
                    <Link to="/login" className={isActive('/login') ? 'active' : ''}>Войти</Link>
                )}
            </div>
        </nav>
    );
}

export default Navigation;

