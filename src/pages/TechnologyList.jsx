import useTechnologies from "../hooks/useTechnologies";
import { Link } from "react-router-dom";

function TechnologyList() {
    const { technologies, progress, cycleStatus } = useTechnologies();

    const getStatusText = (status) => {
        const statusMap = {
            'not-started': 'Не начато',
            'in-progress': 'В процессе',
            'completed': 'Изучено'
        };
        return statusMap[status] || status;
    };

    const handleCardClick = (techId, e) => {
        if (e.target.tagName === 'A') return;
        cycleStatus(techId);
    };

    return (
        <div>
            <h1>Все технологии ({technologies.length})</h1>
            <p>Прогресс: {progress}%</p>

            <div className="tech-list">
                {technologies.map((tech) => (
                    <div 
                        className="tech-item" 
                        key={tech.id}
                        data-status={tech.status}
                        onClick={(e) => handleCardClick(tech.id, e)}
                    >
                        <h3>{tech.title}</h3>
                        <p>{tech.description}</p>
                        <p>
                            <strong>Статус:</strong> {getStatusText(tech.status)}
                        </p>
                        <Link to={`/technology/${tech.id}`}>Подробнее →</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TechnologyList;