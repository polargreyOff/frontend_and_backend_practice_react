import { useParams, Link } from "react-router-dom";
import useTechnologies from "../hooks/useTechnologies";

function TechnologyDetail() {
    const { id } = useParams();
    const { technologies, updateStatus, updateNotes } = useTechnologies();

    const tech = technologies.find(t => t.id === Number(id));

    if (!tech) {
        return <h2>Технология не найдена</h2>;
    }

    return (
        <div>
            <Link to="/technologies">← Назад</Link>
            <h1>{tech.title}</h1>

            <p>{tech.description}</p>

            <h3>Статус: {tech.status}</h3>

            <button onClick={() => updateStatus(tech.id, "not-started")}>Не начато</button>
            <button onClick={() => updateStatus(tech.id, "in-progress")}>В процессе</button>
            <button onClick={() => updateStatus(tech.id, "completed")}>Готово</button>

            <h3>Заметки</h3>
            <textarea
                value={tech.notes}
                onChange={(e) => updateNotes(tech.id, e.target.value)}
            />
        </div>
    );
}

export default TechnologyDetail;
