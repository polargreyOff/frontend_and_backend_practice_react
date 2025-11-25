import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTechnologies from "../hooks/useTechnologies";

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
        <form onSubmit={handleSubmit}>
            <h1>Добавить технологию</h1>

            <label>Название:</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label>Описание:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <button type="submit">Добавить</button>
        </form>
    );
}

export default AddTechnology;
