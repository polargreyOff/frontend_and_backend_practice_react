import { useState } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import './BulkStatusEditor.css';

function BulkStatusEditor() {
    const { technologies, setTechnologies } = useTechnologies();
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [newStatus, setNewStatus] = useState('in-progress');

    const toggleSelect = (id) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    const selectAll = () => {
        const allIds = new Set(technologies.map(t => t.id));
        setSelectedIds(allIds);
    };

    const clearSelection = () => {
        setSelectedIds(new Set());
    };

    const applyBulkUpdate = () => {
        if (selectedIds.size === 0) {
            alert('Выберите хотя бы одну технологию');
            return;
        }

        const updated = technologies.map(t =>
            selectedIds.has(t.id) ? { ...t, status: newStatus } : t
        );

        setTechnologies(updated);
        setSelectedIds(new Set());
        alert(`Статус обновлён для ${selectedIds.size} технологий`);
    };

    const statusLabels = {
        'not-started': 'Не начато',
        'in-progress': 'В процессе',
        'completed': 'Изучено'
    };

    return (
        <div className="bulk-editor">
            <h3>Массовое редактирование статусов</h3>

            <div className="bulk-controls">
                <button type="button" onClick={selectAll} className="btn-secondary">
                    Выбрать все
                </button>
                <button type="button" onClick={clearSelection} className="btn-secondary">
                    Снять выбор
                </button>

                <div className="status-select-group">
                    <label htmlFor="bulk-status">Новый статус:</label>
                    <select
                        id="bulk-status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        aria-label="Выберите статус для массового обновления"
                    >
                        {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="button"
                    onClick={applyBulkUpdate}
                    disabled={selectedIds.size === 0}
                    className="btn-primary"
                >
                    Обновить статус ({selectedIds.size})
                </button>
            </div>

            <div className="tech-checkbox-list" role="listbox" aria-multiselectable="true">
                {technologies.map(tech => (

                    <label className="tech-checkbox-item">
                        <input type="checkbox" checked={selectedIds.has(tech.id)} onChange = {() => toggleSelect(tech.id)} />
                        <span className="tech-title">{tech.title}</span>
                        <span className="tech-current-status">({statusLabels[tech.status]})</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default BulkStatusEditor;