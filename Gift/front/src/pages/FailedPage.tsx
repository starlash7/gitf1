import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { parseEther } from 'ethers';


interface Participant {
    address: string;
    amount: string;
}


const FailedPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showShareModal, setShowShareModal] = useState(false);
    const [fundingData, setFundingData] = useState({
        nickname: 'To. 취업 축하',
        id: '5',
        walletAddress: '',
        targetAmount: '0.5',
        currentAmount: '0.2',
        deadline: '2025.01.12 18:00',
        description: '취업했어요~!',
        imageUrl: "/images/5.png",
        participants: [
            { address: '0x4AC1...', amount: '0.1ETH' },
            { address: '0X1FF2...', amount: '0.1ETH' }
        ],
        daysLeft: 0,
        progress: 40,
        status: '실패'
    });

    useEffect(() => {
        checkWalletConnection();
        getFundingData();
    }, [id]);

    const checkWalletConnection = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) return;

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                setFundingData(prev => ({
                    ...prev,
                    walletAddress: accounts[0]
                }));
            }
        } catch (error) {
            console.error('지갑 연결 확인 중 오류:', error);
        }
    };

    const getFundingData = async () => {
        try {
            // 스마트 컨트랙트에서 펀딩 정보 조회
        } catch (error) {
            console.error('펀딩 정보 조회 실패:', error);
        }
    };

    const handleShare = () => {
        setShowShareModal(true);
    };

    const handleCopyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
        setShowShareModal(false);
    };

    const handleRefund = () => {
        navigate(`/refund/${id}`);
    };

    const handleAdditionalFunding = async () => {
        try {
            const { ethereum } = window as any;
            if (!ethereum) {
                alert('MetaMask가 필요합니다.');
                return;
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            // 목표액과 현재 모금액의 차이 계산
            const targetAmount = parseFloat(fundingData.targetAmount);
            const currentAmount = parseFloat(fundingData.currentAmount);
            const remainingAmount = (targetAmount - currentAmount).toFixed(18); // ETH는 18자리 소수점

            // Wei로 변환
            const weiAmount = parseEther(remainingAmount);

            const transaction = {
                from: account,
                to: fundingData.walletAddress,
                value: weiAmount.toString(),
                gas: '21000',
            };

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [transaction],
            });

            navigate(`/success/${id}`);
        } catch (error) {
            console.error('추가 펀딩 실패:', error);
            alert('추가 펀딩에 실패했습니다.');
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
                        onClick={handleCopyUrl}
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

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="max-w-[1200px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl flex items-center gap-2">
                        {fundingData.nickname}{' '}
                        <span className="text-[#4B9AFB]">#{fundingData.id}</span>
                        <span className="text-sm px-3 py-1 text-[#FF4C4C] border border-[#FF4C4C] rounded-full">
                            {fundingData.status}
                        </span>
                    </h1>
                </div>

                <div className="grid grid-cols-[400px,1fr,300px] gap-8">
                    {/* 이미지 섹션 */}
                    <div className="w-[400px] h-[400px] bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src="/images/5.png"
                            alt="펀딩 이미지"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* 가운데 펀딩 정보 */}
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
                            <span className="flex-1">{fundingData.deadline}</span>
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
                                onClick={handleShare}
                                className="p-2 border rounded-lg hover:bg-gray-50"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </button>
                            <button
                                onClick={handleRefund}
                                className="flex-1 py-3 bg-gray-400 text-white rounded-lg hover:opacity-90"
                            >
                                환불하기
                            </button>
                            <button
                                onClick={handleAdditionalFunding}
                                className="flex-1 py-3 bg-[#3BCFB4] text-white rounded-lg hover:opacity-90"
                            >
                                추가 펀딩하기
                            </button>
                        </div>
                    </div>

                    {/* 펀딩한 사람들 섹션 */}
                    <div className="bg-white rounded-lg p-6 border min-h-[600px]">
                        <h2 className="text-lg font-bold mb-4">
                            펀딩한 사람들 ({fundingData.participants.length}명)
                        </h2>
                        <div className="space-y-4">
                            {fundingData.participants.map((participant, index) => (
                                <div key={index} className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">{participant.address}</span>
                                    <span className="text-[#4B9AFB]">{participant.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {showShareModal && <ShareModal />}
        </div>
    );
};

export default FailedPage;
