import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const navigate = useNavigate();
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        walletAddress: '',
        nickname: '',
        targetAmount: '',
        deadline: '',
        description: '',
        image: null
    });

    useEffect(() => {
        checkWalletConnection();
    }, []);

    const checkWalletConnection = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) return;
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            setIsWalletConnected(accounts.length > 0);
            if (accounts.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    walletAddress: accounts[0]
                }));
            }
        } catch (error) {
            console.error("지갑 연결 확인 중 오류:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [imagePreview, setImagePreview] = useState(null);

    // handleImageUpload 함수 수정
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));

            // 이미지 미리보기 URL 생성
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 스마트 컨트랙트 배포 로직
            setShowModal(true);
        } catch (error) {
            console.error("펀딩 생성 실패:", error);
        }
    };

    const handleModalConfirm = () => {
        const fundingId = '1234'; // 실제 생성된 펀딩 ID
        navigate(`/detail/${fundingId}`);
    };

    const Modal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[400px] text-center">
                <h3 className="text-xl font-bold mb-4">펀딩 생성 완료</h3>
                <p className="mb-6">새로운 펀딩 생성에 성공했습니다</p>
                <button
                    onClick={handleModalConfirm}
                    className="w-full py-3 bg-[#3BCFB4] text-white rounded-lg hover:opacity-90"
                >
                    확인
                </button>
            </div>
        </div>
    );

    if (!isWalletConnected) {
        return (
            <div className="container mx-auto px-6 py-8 flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-xl mb-4">지갑 연결이 필요합니다</h2>
                <button
                    onClick={checkWalletConnection}
                    className="px-6 py-2 bg-[#3BCFB4] text-white rounded-lg hover:opacity-90"
                >
                    지갑 연결하기
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-2xl font-bold mb-8">새 펀딩 생성하기</h1>

            <div className="max-w-4xl mx-auto grid grid-cols-[300px,1fr] gap-8">
                {/* 이미지 업로드 섹션 */}
                <div className="w-[300px] h-[300px] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
                    {imagePreview ? (
                        <div className="w-full h-full relative group">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="cursor-pointer text-white">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <span>사진 변경</span>
                                </label>
                            </div>
                        </div>
                    ) : (
                        <label className="cursor-pointer text-center">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <span className="text-gray-500">사진 추가</span>
                        </label>
                    )}
                </div>

                {/* 폼 섹션 */}
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1">지갑주소</label>
                        <input
                            type="text"
                            value={formData.walletAddress}
                            className="w-full p-2 border rounded bg-gray-50"
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block mb-1">닉네임</label>
                        <input
                            type="text"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                            placeholder=""
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">목표액</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="targetAmount"
                                value={formData.targetAmount}
                                onChange={handleChange}
                                placeholder=""
                                className="w-full p-2 border rounded pr-16"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2">
                                ETH
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1">마감일</label>
                        <input
                            type="datetime-local"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">설명</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="선물의 내용을 입력해주세요."
                            className="w-full p-2 border rounded h-32"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-[#3BCFB4] text-white rounded-lg hover:opacity-90"
                    >
                        등록하기
                    </button>
                </div>
            </div>

            {showModal && <Modal />}
        </div>
    );
};

export default CreatePage;
