import useTechnologies from '../hooks/useTechnologies';
import './Statistics.css';

function Statistics() {
    const { technologies, progress } = useTechnologies();

    const total = technologies.length;
    const counts = {
        completed: technologies.filter(t => t.status === 'completed').length,
        'in-progress': technologies.filter(t => t.status === 'in-progress').length,
        'not-started': technologies.filter(t => t.status === 'not-started').length
    };

    // простая бар-визуализация через div
    const percentage = (n) => total === 0 ? 0 : Math.round((n / total) * 100);

    return (
        <div className="page">
            <h1>Статистика</h1>

            <div className="stats-cards">
                <div className="card">
                    <h3>Общий прогресс</h3>
                    <div className="big-progress">{progress}%</div>
                </div>

                <div className="card">
                    <h3>Всего технологий</h3>
                    <div className="big-progress small">{total}</div>
                </div>
            </div>

            <div className="bars">
                <h3>Статусы</h3>
                <div className="stat-row">
                    <div className="label">Изучено ({counts.completed})</div>
                    <div className="bar">
                        <div className="bar-fill completed" style={{ width: `${percentage(counts.completed)}%` }} />
                    </div>
                    <div className="pct">{percentage(counts.completed)}%</div>
                </div>

                <div className="stat-row">
                    <div className="label">В процессе ({counts['in-progress']})</div>
                    <div className="bar">
                        <div className="bar-fill in-progress" style={{ width: `${percentage(counts['in-progress'])}%` }} />
                    </div>
                    <div className="pct">{percentage(counts['in-progress'])}%</div>
                </div>

                <div className="stat-row">
                    <div className="label">Не начато ({counts['not-started']})</div>
                    <div className="bar">
                        <div className="bar-fill not-started" style={{ width: `${percentage(counts['not-started'])}%` }} />
                    </div>
                    <div className="pct">{percentage(counts['not-started'])}%</div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
