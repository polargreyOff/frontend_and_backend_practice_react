import './App.css';
import { useState } from 'react';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';

function App() {
    // Состояние для массива технологий
    const [technologies, setTechnologies] = useState([
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
    ]);

    // Состояние для активного фильтра
    const [activeFilter, setActiveFilter] = useState('all');

    // Функция для изменения статуса технологии
    const handleStatusChange = (id, newStatus) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => 
                tech.id === id ? { ...tech, status: newStatus } : tech
            )
        );
    };

    // Функция для отметки всех как выполненных
    const markAllCompleted = () => {
        setTechnologies(prevTech => 
            prevTech.map(tech => ({ ...tech, status: 'completed' }))
        );
    };

    // Функция для сброса всех статусов
    const resetAllStatuses = () => {
        setTechnologies(prevTech => 
            prevTech.map(tech => ({ ...tech, status: 'not-started' }))
        );
    };

    // Фильтрация технологий по активному фильтру
    const filteredTechnologies = technologies.filter(tech => {
        switch(activeFilter) {
            case 'completed':
                return tech.status === 'completed';
            case 'in-progress':
                return tech.status === 'in-progress';
            case 'not-started':
                return tech.status === 'not-started';
            default:
                return true; // 'all'
        }
    });

    return (
        <div className="App">
            <header className="App-header">
                <h1>🚀 Трекер изучения технологий</h1>
                <p>Отслеживайте ваш прогресс в изучении современных технологий</p>
            </header>

            <ProgressHeader technologies={technologies} />
            
            <QuickActions 
                onMarkAllCompleted={markAllCompleted}
                onResetAllStatuses={resetAllStatuses}
            />

            <FilterTabs 
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                technologies={technologies}
            />
            
            <main className="technologies-container">
                <h2>Дорожная карта технологий ({filteredTechnologies.length})</h2>
                <div className="technologies-list">
                    {filteredTechnologies.map(technology => (
                        <TechnologyCard
                            key={technology.id}
                            id={technology.id}
                            title={technology.title}
                            description={technology.description}
                            status={technology.status}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;