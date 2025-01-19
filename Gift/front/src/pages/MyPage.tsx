import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FundingCard from '../components/FundingCard';
import SuccessCard from '../components/SuccessCard';
import FailedCard from '../components/FailedCard';

const MyPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('created');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // 모집한 펀딩 목업 데이터
    const mockCreatedData = [
        {
            id: '11',
            title: "생일 선물",
            currentAmount: "0.498",
            targetAmount: "0.498",
            deadline: "2025.01.1",
            daysLeft: "0",
            progress: 100,
            status: 'success',
            imageUrl: "/12.PNG",
        },
        {
            id: '12',
            title: "빼빼로데이 선물",
            currentAmount: "0.05",
            targetAmount: "0.1000",
            deadline: "2024.01.15",
            daysLeft: "0",
            progress: 50,
            status: 'failed',
            imageUrl: "/1.png",
        },
        {
            id: '13',
            title: "새해 선물",
            currentAmount: "0.3000",
            targetAmount: "0.8000",
            deadline: "2024.01.25",
            daysLeft: "6",
            progress: 37,
            status: 'ongoing',
            imageUrl: "/15.png",
        }
    ];

    // 참여한 펀딩 목업 데이터
    const mockParticipatedData = [
        {
            id: '14',
            title: "To. 화이트데이 선물",
            currentAmount: "0.6000",
            targetAmount: "0.6000",
            deadline: "2024.01.10",
            daysLeft: "0",
            progress: 100,
            status: 'ongoing',
            imageUrl: "/6.PNG",
        },
        {
            id: '15',
            title: "To. 취업 축하",
            currentAmount: "0.2000",
            targetAmount: "0.5000",
            deadline: "2024.01.05",
            daysLeft: "0",
            progress: 40,
            status: 'failed'
        },
    ];

    const currentData = activeTab === 'created' ? mockCreatedData : mockParticipatedData;
    const currentItems = currentData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(currentData.length / itemsPerPage);
    const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleCardClick = (id: string, status: string) => {
        // 클릭한 카드의 데이터를 localStorage에 저장
        const selectedCard = currentData.find(item => item.id === id);
        if (selectedCard) {
            localStorage.setItem('selectedFunding', JSON.stringify(selectedCard));
        }

        if (activeTab === 'created') {
            switch (status) {
                case 'success':
                    navigate(`/mysuccess/${id}`);
                    break;
                case 'failed':
                    navigate(`/myfailed/${id}`);
                    break;
                default:
                    navigate(`/myongoing/${id}`);
            }
        } else {
            switch (status) {
                case 'success':
                    navigate(`/success/${id}`);
                    break;
                case 'failed':
                    navigate(`/failed/${id}`);
                    break;
                default:
                    navigate(`/ongoing/${id}`);
            }
        }
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto px-6 py-8 mt-[30px]">
            <h1 className="text-3xl font-bold mb-8">내 펀딩</h1>

            {/* 탭 메뉴 */}
            <div className="flex gap-4 mb-8 border-b">
                <button
                    onClick={() => handleTabChange('created')}
                    className={`pb-4 px-4 ${activeTab === 'created'
                        ? 'text-[#3BCFB4] border-b-2 border-[#3BCFB4]'
                        : 'text-gray-500'
                        }`}
                >
                    모집한 펀딩
                </button>
                <button
                    onClick={() => handleTabChange('participated')}
                    className={`pb-4 px-4 ${activeTab === 'participated'
                        ? 'text-[#0e2521] border-b-2 border-[#3BCFB4]'
                        : 'text-gray-500'
                        }`}
                >
                    참여한 펀딩
                </button>
            </div>

            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {currentItems.map((item) => {
                    if (item.status === 'success') {
                        return (
                            <div
                                key={item.id}
                                onClick={() => handleCardClick(item.id, item.status)}
                                className="cursor-pointer transition-transform duration-200 hover:scale-105"
                            >
                                <SuccessCard {...item} />
                            </div>
                        );
                    } else if (item.status === 'failed') {
                        return (
                            <div
                                key={item.id}
                                onClick={() => handleCardClick(item.id, item.status)}
                                className="cursor-pointer transition-transform duration-200 hover:scale-105"
                            >
                                <FailedCard {...item} />
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={item.id}
                                onClick={() => handleCardClick(item.id, item.status)}
                                className="cursor-pointer transition-transform duration-200 hover:scale-105"
                            >
                                <FundingCard {...item} />
                            </div>
                        );
                    }
                })}
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center items-center gap-2 mt-12">
                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
                >
                    ‹
                </button>

                {pageButtons.map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg ${currentPage === page
                            ? 'bg-[#3BCFB4] text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default MyPage;
