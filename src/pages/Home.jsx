import RoadmapImporter from '../components/RoadmapImporter';

function Home() {
    return (
        <div>
            <h1>Добро пожаловать в Трекер технологий!</h1>
            <p>Отслеживайте свой прогресс в изучении современных технологий.</p>
            <p>Для импорта из api и поиска возможно понадобиться vpn*</p>

            <RoadmapImporter />
        </div>
    );
}

export default Home;