import { useNavigate } from 'react-router-dom';
import FundingCard from './FundingCard';
import { mockData } from '../data/mockData';

interface FundingCardListProps {
    title: string;
}

interface FundingData {
    id: string;
    title: string;
    currentAmount: string;
    targetAmount: string;
    deadline: string;
    daysLeft: string;
    progress: number;
    imageUrl: string;  
    walletAddress: string;
    description: string;
    participants: {
        address: string;
        amount: string;
        nickname: string;
    }[];
}

const FundingCardList = ({ title }: FundingCardListProps) => {
    const navigate = useNavigate();

    // 타이틀에 따라 적절한 데이터 선택
    const listData: FundingData[] = title === "마감임박 펀딩"
        ? mockData.mainPage.deadline
        : mockData.mainPage.new;

    const handleCardClick = (id: string) => {
        // 현재 카드의 데이터를 localStorage에 저장
        const selectedCard = listData.find(item => item.id === id);
        if (selectedCard) {
            localStorage.setItem('selectedFunding', JSON.stringify(selectedCard));
        }
        navigate(`/ongoing/${id}`);
    };

    const handleViewAll = () => {
        if (title === "마감임박 펀딩") {
            navigate('/deadline');
        } else if (title === "신규 펀딩") {
            navigate('/new');
        }
    };

    return (
        <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                <button
                    onClick={handleViewAll}
                    className="text-gray-500 hover:text-gray-700"
                >
                    전체보기 →
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {listData.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleCardClick(item.id)}
                        className="cursor-pointer transition-transform duration-200 hover:scale-105"
                    >
                        <FundingCard
                            id={item.id}
                            title={item.title}
                            currentAmount={item.currentAmount}
                            targetAmount={item.targetAmount}
                            deadline={item.deadline}
                            daysLeft={item.daysLeft}
                            progress={item.progress}
                            imageUrl={item.imageUrl}  // imageUrl prop 추가
                            onClick={() => handleCardClick(item.id)}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FundingCardList;
