import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`px-6 py-2 text-xl font-medium leading-8 transition-colors
        ${isActive ? 'text-[#3BCFB4]' : 'text-[#929292] hover:text-gray-600'}`}
        >
            {children}
        </Link>
    );
};

const Navbar = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [isConnecting, setIsConnecting] = useState(false);

    // MetaMask가 설치되어 있는지 확인
    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                console.log("MetaMask를 설치해주세요!");
                return;
            }

            // 연결된 계정 확인
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length !== 0) {
                setWalletAddress(accounts[0]);
            }
        } catch (error) {
            console.error("지갑 연결 확인 중 오류 발생:", error);
        }
    };

    // 지갑 연결 함수
    const connectWallet = async () => {
        try {
            setIsConnecting(true);
            const { ethereum } = window;
            if (!ethereum) {
                alert("MetaMask를 설치해주세요!");
                return;
            }

            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            });

            setWalletAddress(accounts[0]);
        } catch (error) {
            console.error("지갑 연결 중 오류 발생:", error);
        } finally {
            setIsConnecting(false);
        }
    };

    // 지갑 주소 포맷팅
    const formatAddress = (address) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full h-[90px] bg-white border-b border-[#D5D5D5] z-50">
            <div className="max-w-[1440px] h-full mx-auto px-6">
                <div className="flex justify-between items-center h-full">
                    {/* Logo */}
                    <Link to="/" className="text-[32px] font-bold leading-[52px]">
                        PresentHub
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-4">
                        <NavLink to="/deadline">마감임박 펀딩</NavLink>
                        <NavLink to="/new">신규 펀딩</NavLink>
                        <NavLink to="/create">새 펀딩 생성하기</NavLink>
                        <NavLink to="/my">내 펀딩</NavLink>
                    </div>

                    {/* Wallet Button */}
                    <button
                        onClick={connectWallet}
                        disabled={isConnecting}
                        className={`px-6 py-2 rounded-lg transition-colors
              ${walletAddress
                                ? 'bg-[#E8FFF9] text-[#3BCFB4] border border-[#3BCFB4]'
                                : 'bg-[#3BCFB4] text-white hover:opacity-90'}
              ${isConnecting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {isConnecting
                            ? '연결 중...'
                            : walletAddress
                                ? formatAddress(walletAddress)
                                : 'Wallet 연결'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;