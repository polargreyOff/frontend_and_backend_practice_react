import useTechnologies from "../hooks/useTechnologies";
import { Link } from "react-router-dom";

function TechnologyList() {
    const { technologies, progress } = useTechnologies();

    return (
        <div>
            <h1>Все технологии ({technologies.length})</h1>
            <p>Прогресс: {progress}%</p>

            <div className="tech-list">
                {technologies.map((tech) => (
                    <div className="tech-item" key={tech.id}>
                        <h3>{tech.title}</h3>
                        <p>{tech.description}</p>

                        <p><strong>Статус:</strong> {tech.status}</p>

                        <Link to={`/technology/${tech.id}`}>Подробнее →</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TechnologyList;
