import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { parseEther } from 'ethers';
import FundingModal from '../components/FundingModal';

interface Participant {
    address: string;
    amount: string;
}

const MyOngoingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showShareModal, setShowShareModal] = useState(false);
    const [showFundingModal, setShowFundingModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [balance, setBalance] = useState('0');
    const [fundingForm, setFundingForm] = useState({
        amount: '',
        nickname: '',
        message: ''
    });
    const [fundingData, setFundingData] = useState({
        nickname: '새해 선물',
        id: '3',
        walletAddress: '',
        targetAmount: '0.8',
        currentAmount: '0.3',
        deadline: '2025.01.25 18:00',
        description: '새해 선물 주세요',
        imageUrl: "/images/15.png",
        participants: [
            { address: '0x1BF...', amount: '0.1ETH' },
            { address: '0x0DG...', amount: '0.2ETH' }
        ],
        daysLeft: 6,
        progress: 37,
        status: '진행중'
    });

    useEffect(() => {
        checkWalletConnection();
        getBalance();
    }, [id]);

    const checkWalletConnection = async () => {
        const { ethereum } = window as any;
        if (!ethereum) return;
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts[0]) {
            setFundingData(prev => ({ ...prev, walletAddress: accounts[0] }));
        }
    };

    const getBalance = async () => {
        const { ethereum } = window as any;
        if (!ethereum) return;

        try {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts[0]) {
                const balance = await ethereum.request({
                    method: 'eth_getBalance',
                    params: [accounts[0], 'latest']
                });
                // Wei를 ETH로 변환 (18자리 소수점 고려)
                const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);
                setBalance(ethBalance.toFixed(4)); // 소수점 4자리까지만 표시
            }
        } catch (error) {
            console.error('잔액 조회 실패:', error);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowShareModal(false);
    };

    const handleFunding = () => {
        setShowFundingModal(true);
    };

    const handleFundingSubmit = async () => {
        try {
            // 1. 입력값 검증
            if (!fundingForm.amount || !fundingForm.nickname) {
                alert('필수 항목을 입력해주세요.');
                return;
            }

            const amount = parseFloat(fundingForm.amount);
            if (isNaN(amount) || amount <= 0) {
                alert('올바른 금액을 입력해주세요.');
                return;
            }

            // 2. 메타마스크 존재 확인
            const { ethereum } = window as any;
            if (!ethereum) {
                alert('MetaMask가 필요합니다.');
                return;
            }

            // 3. 계정 연결 및 잔액 확인
            let accounts;
            try {
                accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const balance = await ethereum.request({
                    method: 'eth_getBalance',
                    params: [accounts[0], 'latest']
                });
                const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);

                if (amount > ethBalance) {
                    alert('잔액이 부족합니다.');
                    return;
                }
            } catch (error) {
                alert('지갑 연결에 실패했습니다.');
                return;
            }

            // 4. 트랜잭션 실행
            const weiAmount = parseEther(fundingForm.amount);
            const txHash = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: accounts[0],
                    to: fundingData.walletAddress,
                    value: weiAmount.toString(),
                    gas: '21000'
                }]
            });

            // 5. 성공 처리
            if (txHash) {
                setShowFundingModal(false);
                setShowConfirmModal(true);
                getBalance();
                setFundingForm({
                    amount: '',
                    nickname: '',
                    message: ''
                });
            }
        } catch (error) {
            console.error('펀딩 실패:', error);
            alert('펀딩에 실패했습니다.');
        }
    };




    const ShareModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[400px]">
                <h3 className="text-xl font-bold mb-4">공유하기</h3>
                <div className="flex items-center space-x-2 mb-6">
                    <input
                        type="text"
                        value={window.location.href}
                        className="flex-1 p-2 border rounded bg-gray-50"
                        readOnly
                    />
                    <button
                        onClick={handleShare}
                        className="px-4 py-2 bg-[#3BCFB4] text-white rounded hover:opacity-90"
                    >
                        복사
                    </button>
                </div>
                <button
                    onClick={() => setShowShareModal(false)}
                    className="w-full py-2 border rounded text-gray-600 hover:bg-gray-50"
                >
                    닫기
                </button>
            </div>
        </div>
    );

    const ConfirmModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[400px] text-center">
                <h3 className="text-xl font-bold mb-4">펀딩 완료</h3>
                <p className="mb-6">펀딩에 성공했습니다!</p>
                <button
                    onClick={() => setShowConfirmModal(false)}
                    className="w-full py-3 bg-[#3BCFB4] text-white rounded-lg hover:opacity-90"
                >
                    확인
                </button>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="max-w-[1200px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl flex items-center gap-2">
                        {fundingData.nickname}{' '}
                        <span className="text-[#4B9AFB]">#{fundingData.id}</span>
                        <span className="text-sm px-3 py-1 text-[#4B9AFB] border border-[#4B9AFB] rounded-full">
                            {fundingData.status}
                        </span>
                    </h1>
                </div>

                <div className="grid grid-cols-[400px,1fr,300px] gap-8">
                    <div className="w-[400px] h-[400px] bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src="/images/15.png"
                            alt="펀딩 이미지"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center py-4 border-b">
                            <span className="w-24 text-gray-600">지갑주소</span>
                            <span className="flex-1">{fundingData.walletAddress}</span>
                        </div>

                        <div className="flex items-center py-4 border-b">
                            <span className="w-24 text-gray-600">목표액</span>
                            <span className="flex-1">{fundingData.targetAmount} ETH</span>
                        </div>

                        <div className="flex items-center py-4 border-b">
                            <span className="w-24 text-gray-600">모금액</span>
                            <span className="flex-1">
                                {fundingData.currentAmount} ETH
                                <span className="text-[#4B9AFB]"> ({fundingData.progress}% 달성)</span>
                            </span>
                        </div>

                        <div className="flex items-center py-4 border-b">
                            <span className="w-24 text-gray-600">마감일</span>
                            <span className="flex-1">
                                {fundingData.deadline}
                                <span className="text-[#4B9AFB]"> ({fundingData.daysLeft}일 남음)</span>
                            </span>
                        </div>

                        <div className="flex items-center py-4 border-b">
                            <span className="w-24 text-gray-600">설명</span>
                            <span className="flex-1">{fundingData.description}</span>
                        </div>

                        <div className="flex items-center space-x-4 pt-8">
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                            >
                                목록으로
                            </button>
                            <button
                                onClick={() => setShowShareModal(true)}
                                className="p-2 border rounded-lg hover:bg-gray-50"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </button>
                            <button
                                onClick={handleFunding}
                                className="flex-1 py-3 bg-[#3BCFB4] text-white rounded-lg hover:opacity-90"
                            >
                                펀딩하기
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border min-h-[600px]">
                        <h2 className="text-lg font-bold mb-4">
                            펀딩한 사람들 ({fundingData.participants.length}명)
                        </h2>
                        {fundingData.participants.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">
                                아직 펀딩한 사람이 없어요
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {fundingData.participants.map((participant, index) => (
                                    <div key={index} className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">{participant.address}</span>
                                        <span className="text-[#4B9AFB]">{participant.amount}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showFundingModal && (
                <FundingModal
                    fundingForm={fundingForm}
                    setFundingForm={setFundingForm}
                    setShowFundingModal={setShowFundingModal}
                    handleFundingSubmit={handleFundingSubmit}
                />
            )}
        </div>
    );
};

export default MyOngoingPage;
