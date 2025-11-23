import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, onStatusChange }) {
    const handleClick = () => {
        // Определяем следующий статус в цикле
        const statusOrder = ['not-started', 'in-progress', 'completed'];
        const currentIndex = statusOrder.indexOf(status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        const nextStatus = statusOrder[nextIndex];
        
        // Вызываем функцию изменения статуса
        onStatusChange(id, nextStatus);
    };

    return (
        <div 
            className={`technology-card status-${status}`}
            onClick={handleClick}
        >
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <span className={`status-badge status-${status}`}>
                    {getStatusText(status)}
                </span>
            </div>
            <p className="card-description">{description}</p>
            <div className="card-footer">
                <div className="progress-indicator">
                    {renderStatusIcon(status)}
                </div>
                <span className="click-hint">Нажмите для смены статуса</span>
            </div>
        </div>
    );
}

// Функция для получения текста статуса
function getStatusText(status) {
    const statusMap = {
        'completed': 'Изучено',
        'in-progress': 'В процессе',
        'not-started': 'Не начато'
    };
    return statusMap[status] || status;
}

// Функция для отображения иконки статуса
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