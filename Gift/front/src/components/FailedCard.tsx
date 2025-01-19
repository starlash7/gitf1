import React from 'react';

const FundingCard = ({
    title = "To. XXX",
    currentAmount = "0.4509",
    targetAmount = "0.5782",
    deadline = "2025.01.01",
    daysLeft = "10",
    progress = 78,
    onClick
}) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow">
            {/* Image & Progress */}
            <div className="relative">
                <img
                    src="/Logo.PNG"
                    alt="keyboard"
                    className="w-full h-[202px] object-cover bg-black"
                />
                <span className="absolute top-4 right-4 text-white font-medium">
                    {progress}%
                </span>
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1">
                    <div className="absolute w-full h-full bg-[#D5D5D5]" />
                    <div
                        className="absolute h-full bg-[#79AEFA]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <span className="px-4 py-1 text-[#FF4C4C] border border-[#FF4C4C] rounded-full">
                        실패
                    </span>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-[#929292]">모금액</span>
                        <span>
                            {currentAmount} <span className="text-[#929292]">ETH</span>
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#929292]">목표액</span>
                        <span>
                            {targetAmount} <span className="text-[#929292]">ETH</span>
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#929292]">마감일</span>
                        <span>
                            {deadline} <span className="text-[#929292]">(D-{daysLeft})</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FundingCard;