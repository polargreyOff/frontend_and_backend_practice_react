import './App.css';
import { useState } from 'react';
import useTechnologies from './hooks/useTechnologies';
import ProgressBar from './components/ProgressBar';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';

function App() {
    const { 
        technologies, 
        updateStatus, 
        updateNotes, 
        markAllCompleted, 
        resetAllStatuses, 
        progress 
    } = useTechnologies();

    const [activeFilter, setActiveFilter] = useState('all');

    const filteredTechnologies = technologies.filter(tech => {
        switch(activeFilter) {
            case 'completed':
                return tech.status === 'completed';
            case 'in-progress':
                return tech.status === 'in-progress';
            case 'not-started':
                return tech.status === 'not-started';
            default:
                return true;
        }
    });

    return (
        <div className="App">
            <header className="App-header">
                <h1>🚀 Трекер изучения технологий</h1>
                <p>Отслеживайте ваш прогресс в изучении современных технологий</p>
                <ProgressBar
                    progress={progress}
                    label="Общий прогресс"
                    color="#4CAF50"
                    animated={true}
                    height={20}
                />
            </header>

            <QuickActions 
                onMarkAllCompleted={markAllCompleted}
                onResetAllStatuses={resetAllStatuses}
                technologies={technologies}
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
                            technology={technology}
                            onStatusChange={updateStatus}
                            onNotesChange={updateNotes}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;