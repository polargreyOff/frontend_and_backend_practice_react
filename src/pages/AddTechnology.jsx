import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTechnologies from "../hooks/useTechnologies";
import './AddTechnology.css';

function AddTechnology() {
    const { technologies, setTechnologies } = useTechnologies();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTech = {
            id: Date.now(),
            title,
            description,
            notes: "",
            status: "not-started",
        };

        setTechnologies([...technologies, newTech]);
        navigate("/technologies");
    };

    return (
        <form className="add-tech-form" onSubmit={handleSubmit}>
            <h1>Добавить технологию</h1>

            <div className="form-group">
                <label>Название:</label>
                <input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    placeholder="Введите название технологии"
                />
            </div>

            <div className="form-group">
                <label>Описание:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Опишите технологию..."
                />
            </div>

            <button type="submit" className="submit-btn">Добавить технологию</button>
        </form>
    );
}

export default AddTechnology;