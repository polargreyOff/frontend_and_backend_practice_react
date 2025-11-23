import './TechnologyCard.css';

function TechnologyCard({ title, description, status }) {
    return (
        <div className={`technology-card ${status}`}>
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <span className={`status-badge ${status}`}>
                    {getStatusText(status)}
                </span>
            </div>
            <p className="card-description">{description}</p>
            <div className="card-footer">
                <div className="progress-indicator">
                    {renderStatusIcon(status)}
                </div>
            </div>
        </div>
    );
}

function getStatusText(status) {
    const statusMap = {
        'completed': 'Изучено',
        'in-progress': 'В процессе',
        'not-started': 'Не начато'
    };
    return statusMap[status] || status;
}

function renderStatusIcon(status) {
    switch(status) {
        case 'completed':
            return '✅';
        case 'in-progress':
            return '⏳';
        case 'not-started':
            return '⭕';
        default:
            return '❓';
    }
}

export default TechnologyCard;