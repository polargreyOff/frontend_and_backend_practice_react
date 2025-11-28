import { useParams, Link } from "react-router-dom";
import useTechnologies from "../hooks/useTechnologies";
import './TechnologyDetail.css';

function TechnologyDetail() {
    const { id } = useParams();
    const { technologies, updateStatus, updateNotes } = useTechnologies();

    const tech = technologies.find(t => t.id === Number(id));

    if (!tech) {
        return (
            <div className="tech-detail">
                <h2>Технология не найдена</h2>
                <Link to="/technologies" className="back-link">← Назад к списку</Link>
            </div>
        );
    }

    const getStatusText = (status) => {
        const statusMap = {
            'not-started': 'Не начато',
            'in-progress': 'В процессе',
            'completed': 'Изучено'
        };
        return statusMap[status] || status;
    };

    return (
        <div className="tech-detail">
            <Link to="/technologies" className="back-link">← Назад к списку</Link>
            
            <div className="tech-header">
                <h1>{tech.title}</h1>
                <p className="tech-description">{tech.description}</p>
            </div>

            <div className="status-section">
                <h3>Статус: {getStatusText(tech.status)}</h3>
                <div className="status-buttons">
                    <button 
                        className={`status-btn ${tech.status === 'not-started' ? 'active' : ''}`}
                        onClick={() => updateStatus(tech.id, "not-started")}
                    >
                        Не начато
                    </button>
                    <button 
                        className={`status-btn ${tech.status === 'in-progress' ? 'active' : ''}`}
                        onClick={() => updateStatus(tech.id, "in-progress")}
                    >
                        В процессе
                    </button>
                    <button 
                        className={`status-btn ${tech.status === 'completed' ? 'active' : ''}`}
                        onClick={() => updateStatus(tech.id, "completed")}
                    >
                        Изучено
                    </button>
                </div>
            </div>

            <div className="notes-section">
                <h3>Заметки</h3>
                <textarea
                    className="notes-textarea"
                    value={tech.notes}
                    onChange={(e) => updateNotes(tech.id, e.target.value)}
                    placeholder="Добавьте свои заметки по изучению этой технологии..."
                />
            </div>
        </div>
    );
}

export default TechnologyDetail;