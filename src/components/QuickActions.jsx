import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAllStatuses }) {
    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="actions-buttons">
                <button 
                    className="action-btn completed"
                    onClick={onMarkAllCompleted}
                >
                    ✅ Отметить все как выполненные
                </button>
                <button 
                    className="action-btn reset"
                    onClick={onResetAllStatuses}
                >
                    🔄 Сбросить все статусы
                </button>
                
            </div>
        </div>
    );
}

export default QuickActions;