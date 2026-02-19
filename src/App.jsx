import React, { useState } from 'react';
import { X } from 'lucide-react';

const CARDS_DATA = [
    { id: 1, title: "Divine Error", review: "A soft journey through clouds.", img: "/imgs/divine.png" },
    { id: 2, title: "Coin Caw", review: "Refreshing perspectives on design.", img: "/imgs/coin.png" },
    { id: 3, title: "fly in space", review: "Calm, collected, and creative.", img: "/imgs/fly_stars.png" },
    { id: 4, title: "space... smth, idk", review: "Warm tones for a warm soul.", img: "/imgs/space_idk.png" },
    { id: 5, title: "Office Cat-Astrophe", review: "Endless possibilities ahead.", img: "/imgs/office_cat.png" },
    { id: 6, title: "я пытался", review: "Zesty ideas that pop!", img: "/imgs/image6.jpg" },
];

const WINNER_IDS = [5, 4];

export default function App() {
    const [viewedCards, setViewedCards] = useState(new Set());
    const [selectedCard, setSelectedCard] = useState(null);
    const allViewed = viewedCards.size === CARDS_DATA.length;

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setViewedCards((prev) => new Set(prev).add(card.id));
    };

    return (
        <div className="min-h-screen bg-[#fdf6f0] p-6 font-sans text-gray-700">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-pink-300 drop-shadow-sm tracking-tight">Asset Flipping Purity Jam Award Ceremony</h1>
                <p className="mt-2 text-gray-400 font-medium">Explore all 6 cards to unlock the winners!</p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-1 bg-white rounded-full text-xs font-bold text-pink-300 shadow-sm border border-pink-50">
                    Progress: {viewedCards.size} / 6
                </div>
            </header>

            <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {CARDS_DATA.map((card) => {
                    const isWinner = WINNER_IDS.includes(card.id);
                    return (
                        <div
                            key={card.id}
                            onClick={() => handleCardClick(card)}
                            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white p-3 shadow-lg transition-all hover:-translate-y-2 active:scale-95"
                        >
                            <div className="h-56 w-full overflow-hidden rounded-2xl mb-4 bg-gray-50">
                                <img
                                    src={card.img}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=Image+Not+Found'; }}
                                />
                            </div>
                            <div className="px-2 pb-2">
                                <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
                                <p className="text-sm text-pink-300 font-medium italic">View Review ✨</p>
                            </div>

                            {allViewed && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/75 p-4 text-center animate-in fade-in zoom-in duration-500">
                                    {isWinner ? (
                                        <div className="animate-bounce">
                                            <span className="text-5xl block mb-2">👑</span>
                                            <p className="font-black text-amber-600 text-lg leading-tight">Winner of the<br/>8.5 EUR prize</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <span className="text-4xl block mb-2">🎈</span>
                                            <p className="font-bold text-black-400">Participation Award</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedCard && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fdf6f0]/80 backdrop-blur-md p-4">
                    <div className="relative w-full max-w-sm rounded-[2.5rem] bg-white p-10 shadow-2xl border-8 border-white animate-in zoom-in duration-300">
                        <button
                            onClick={() => setSelectedCard(null)}
                            className="absolute -top-4 -right-4 bg-white shadow-lg p-2 hover:bg-pink-50 rounded-full text-pink-300 transition-transform hover:rotate-90"
                        >
                            <X size={28} strokeWidth={3} />
                        </button>

                        <div className="text-center">
                            <div className="mb-6 inline-block p-1 bg-pink-100 rounded-full shadow-inner">
                                <img
                                    src={selectedCard.img}
                                    alt="thumbnail"
                                    className="w-20 h-20 rounded-full object-cover border-4 border-white"
                                />
                            </div>

                            <h3 className="text-2xl font-black text-gray-800 tracking-tight mb-4">
                                {selectedCard.title}
                            </h3>

                            <div className="h-0.5 w-12 bg-pink-100 mx-auto mb-6 rounded-full" />

                            <p className="text-lg italic text-gray-600 leading-relaxed font-medium">
                                "{selectedCard.review}"
                            </p>

                            <button
                                onClick={() => setSelectedCard(null)}
                                className="mt-8 w-full py-4 bg-pink-300 hover:bg-pink-400 text-white text-lg font-black rounded-2xl transition-all shadow-md active:scale-95"
                            >
                                CLOSE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}