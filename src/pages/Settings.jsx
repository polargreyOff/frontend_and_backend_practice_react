import { useState } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import './Settings.css';

function Settings() {
    const { technologies, setTechnologies } = useTechnologies();
    const [importText, setImportText] = useState('');

    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            technologies
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tech-tracker-export-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        alert('Экспорт завершён — файл скачан.');
    };

    const handleImport = () => {
        try {
            const parsed = JSON.parse(importText);
            if (Array.isArray(parsed)) {
                setTechnologies(parsed);
                alert('Импортирован массив технологий.');
            } else if (parsed && Array.isArray(parsed.technologies)) {
                setTechnologies(parsed.technologies);
                alert('Импортирован формат экспорта.');
            } else {
                alert('Неверный формат JSON. Ожидается массив или { technologies: [...] }');
            }
        } catch (err) {
            alert('Ошибка парсинга JSON: ' + err.message);
        }
    };

    const handleReset = () => {
        if (!confirm('Сбросить все технологии в состояние "Не начато"?')) return;
        const reset = technologies.map(t => ({ ...t, status: 'not-started' }));
        setTechnologies(reset);
        alert('Статусы сброшены.');
    };

    const handleClearAll = () => {
        if (!confirm('Полностью очистить локальное хранилище технологий? Это необратимо.')) return;
        setTechnologies([]);
        alert('Данные очищены.');
    };

    return (
        <div className="page settings-page">
            <h1>Настройки</h1>

            <div className="setting-block">
                <h3>Экспорт / импорт данных</h3>
                <div className="btns">
                    <button onClick={handleExport} className="btn">Экспортировать</button>
                    <button onClick={() => { setImportText(JSON.stringify({ technologies }, null, 2)); }} className="btn">Вставить пример в поле импорт</button>
                </div>

                <textarea
                    placeholder='Вставьте JSON сюда (массив или {"technologies": [...]})'
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    rows={8}
                />

                <div className="btns">
                    <button onClick={handleImport} className="btn btn-primary">Импортировать</button>
                </div>
            </div>

            <div className="setting-block">
                <h3>Действия</h3>
                <div className="btns">
                    <button onClick={handleReset} className="btn">Сбросить статусы</button>
                    <button onClick={handleClearAll} className="btn btn-danger">Очистить все</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
