import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FundingCard from '../components/FundingCard';

const DeadlinePage = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const mockData = [
        {
            id: '1',
            title: "To. 생일 선물",
            currentAmount: "0.4509",
            targetAmount: "0.5000",
            deadline: "2024.01.25",
            daysLeft: "5",
            progress: 90,
            imageUrl: "/public/1.png",
        },
        {
            id: '2',
            title: "To. 결혼 선물",
            currentAmount: "0.8900",
            targetAmount: "1.0000",
            deadline: "2024.01.27",
            daysLeft: "5",
            progress: 89,
            imageUrl: "/public/17.PNG",
        },
        {
            id: "3",
            title: "To. 졸업 선물",
            currentAmount: "0.2800",
            targetAmount: "0.3000",
            deadline: "2024.01.24",
            daysLeft: "7",
            progress: 93,
            imageUrl: "/public/13.png",
        },
        {
            id: "4",
            title: "To. 취업 축하",
            currentAmount: "0.6700",
            targetAmount: "0.7000",
            deadline: "2024.01.30",
            daysLeft: "9",
            progress: 95,
            imageUrl: "/public/10.png",
        },
        {
            id: "5",
            title: "To. 입학 선물",
            currentAmount: "0.3400",
            targetAmount: "0.4000",
            deadline: "2024.02.10",
            daysLeft: "11",
            progress: 85,
            imageUrl: "/public/7.png",
        },

    ];

    const currentItems = mockData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(mockData.length / itemsPerPage);
    const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleCardClick = (id: string) => {
        // 클릭한 카드의 데이터를 localStorage에 저장
        const selectedCard = mockData.find(item => item.id === id);
        if (selectedCard) {
            localStorage.setItem('selectedFunding', JSON.stringify(selectedCard));
        }
        navigate(`/ongoing/${id}`);
    };

    return (
        <div className="container mx-auto px-6 py-8 mt-[30px]">
            <h1 className="text-3xl font-bold mb-8">마감임박 펀딩</h1>

            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {currentItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleCardClick(item.id)}
                        className="cursor-pointer transition-transform duration-200 hover:scale-105"
                    >
                        <FundingCard {...item} />
                    </div>
                ))}
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

export default DeadlinePage;
