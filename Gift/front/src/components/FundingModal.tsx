import React from 'react';

interface FundingModalProps {
    fundingForm: {
        amount: string;
        nickname: string;
        message: string;
    };
    setFundingForm: React.Dispatch<React.SetStateAction<{
        amount: string;
        nickname: string;
        message: string;
    }>>;
    setShowFundingModal: (show: boolean) => void;
    handleFundingSubmit: () => void;
}

const FundingModal: React.FC<FundingModalProps> = ({
    fundingForm,
    setFundingForm,
    setShowFundingModal,
    handleFundingSubmit
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFundingForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[500px]">
                <h3 className="text-xl font-bold mb-6">펀딩하기</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">닉네임</label>
                        <input
                            type="text"
                            name="nickname"
                            value={fundingForm.nickname}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded"
                            placeholder="닉네임을 입력하세요"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">펀딩액</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="amount"
                                value={fundingForm.amount}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded pr-16"
                                placeholder="0.0"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2">ETH</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">메시지</label>
                        <textarea
                            name="message"
                            value={fundingForm.message}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded h-24"
                            placeholder="메시지를 입력하세요"
                        />
                    </div>
                    <div className="flex space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowFundingModal(false)}
                            className="flex-1 py-3 border rounded text-gray-600 hover:bg-gray-50"
                        >
                            취소
                        </button>
                        <button
                            type="button"
                            onClick={handleFundingSubmit}
                            className="flex-1 py-3 bg-[#3BCFB4] text-white rounded hover:opacity-90"
                        >
                            펀딩하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FundingModal;
