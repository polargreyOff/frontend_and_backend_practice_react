import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // простая фейковая авторизация
        if (username.trim() && password === 'password') {
            onLogin(username.trim());
            navigate('/technologies');
        } else {
            alert('Либо пустой логин, либо неверный пароль. (пароль: password)');
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Вход</h2>
                <label>Имя пользователя</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label>Пароль</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <div className="auth-actions">
                    <button type="submit" className="btn-primary">Войти</button>
                </div>

                <p className="auth-hint">Подсказка: любой логин + пароль <b>password</b></p>
            </form>
        </div>
    );
}

export default Login;
