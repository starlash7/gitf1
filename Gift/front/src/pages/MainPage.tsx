import { useNavigate } from 'react-router-dom';
import FundingCardList from '../components/FundingCardList';
import { mockData } from '../data/mockData';

const MainPage = () => {
    const navigate = useNavigate();

    const handleBannerClick = () => {
        navigate('/create');
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <FundingCardList
                title="마감임박 펀딩"
                data={mockData.mainPage.deadline}
            />
            <FundingCardList
                title="신규 펀딩"
                data={mockData.mainPage.new}
            />
            <img
                src="/ETH.png"
                alt="ETH Banner"
                className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handleBannerClick}
            />
        </div>
    );
};

export default MainPage;
