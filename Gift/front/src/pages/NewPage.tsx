import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FundingCard from '../components/FundingCard';

const NewPage = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;


    const mockData = [
        {
            id: '6',
            title: "To. 새해 선물",
            currentAmount: "0.1000",
            targetAmount: "0.5000",
            deadline: "2024.03.01",
            daysLeft: "30",
            progress: 20,
            imageUrl: "/images/15.png",
        },
        {
            id: '7',
            title: "To. 집들이 선물",
            currentAmount: "0.2000",
            targetAmount: "0.8000",
            deadline: "2024.03.05",
            daysLeft: "34",
            progress: 25,
            imageUrl: "/images/1.png",
        },
        {
            id: '8',
            title: "To. 기념일 선물",
            currentAmount: "0.3000",
            targetAmount: "1.0000",
            deadline: "2024.03.10",
            daysLeft: "39",
            progress: 30,
            imageUrl: "/images/14.png",
        },
        {
            id: '9',
            title: "To. 부모님 선물",
            currentAmount: "0.1500",
            targetAmount: "0.6000",
            deadline: "2024.03.15",
            daysLeft: "44",
            progress: 25,
            imageUrl: "/images/8.png",
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
            <h1 className="text-3xl font-bold mb-8">신규 펀딩</h1>

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

export default NewPage;
