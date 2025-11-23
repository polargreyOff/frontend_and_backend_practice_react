import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

function App() {
    const technologies = [
        { 
            id: 1, 
            title: 'HTML CSS', 
            description: 'Изучение базовых веб технологий', 
            status: 'completed' 
        },
        { 
            id: 2, 
            title: 'React', 
            description: 'Фреймворк для веб разработки', 
            status: 'completed' 
        },
        { 
            id: 3, 
            title: 'Redux', 
            description: 'Работа с глобальным состоянием', 
            status: 'completed' 
        },
        { 
            id: 4, 
            title: 'Vue', 
            description: 'Ещё один фреймворк', 
            status: 'completed' 
        },
        { 
            id: 5, 
            title: 'Angular', 
            description: 'и ещё один', 
            status: 'in-progress' 
        },
        { 
            id: 6, 
            title: 'docker, ci/cd, k8s', 
            description: 'devops штучки', 
            status: 'not-started' 
        }
    ];

    return (
        <div className="App">
            <header className="App-header">
                <h1>🚀 Трекер изучения технологий</h1>
                <p>Отслеживайте ваш прогресс в изучении современных технологий</p>
            </header>

            <ProgressHeader technologies={technologies} />
            
            <main className="technologies-container">
                <h2>Карта технологий</h2>
                <div className="technologies-list">
                    {technologies.map(technology => (
                        <TechnologyCard
                            key={technology.id}
                            title={technology.title}
                            description={technology.description}
                            status={technology.status}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;