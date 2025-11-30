// src/pages/AddTechnology.jsx
import { useNavigate } from 'react-router-dom';
import TechnologyForm from '../components/TechnologyForm';
import useTechnologies from '../hooks/useTechnologies';
import './AddTechnology.css';

function AddTechnology() {
    const { technologies, setTechnologies } = useTechnologies();
    const navigate = useNavigate();

    const handleSave = (newData) => {
        const newTech = {
            id: Date.now(),
            ...newData,
            status: 'not-started',
            notes: '' // сохраняем совместимость с существующей моделью
        };
        setTechnologies([...technologies, newTech]);
        navigate('/technologies');
    };

    const handleCancel = () => {
        navigate('/technologies');
    };

    return (
        <div className="page add-technology-page">
            <TechnologyForm onSave={handleSave} onCancel={handleCancel} />
        </div>
    );
}

export default AddTechnology;