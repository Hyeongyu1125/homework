import React, { useState } from "react";

const getRandomCards = (count, exclude = []) => {
  const cards = [];
  while (cards.length < count) {
    const num = Math.floor(Math.random() * 20) + 1;
    if (!cards.includes(num) && !exclude.includes(num)) {
      cards.push(num);
    }
  }
  return cards;
};

export default function CardGame() {
  const [pcCards, setPcCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = () => {
    const pc = getRandomCards(2);
    const display = getRandomCards(5, pc);
    setPcCards(pc);
    setUserCards(display);
    setSelected([]);
    setResult("");
    setGameStarted(true);
  };

  const handleReset = () => {
    setPcCards([]);
    setUserCards([]);
    setSelected([]);
    setResult("");
    setGameStarted(false);
  };

  const handleCheck = (num) => {
    if (selected.includes(num)) {
      setSelected(selected.filter((n) => n !== num));
    } else if (selected.length < 2) {
      setSelected([...selected, num]);
    }
  };

  const handleSelect = () => {
    if (selected.length !== 2) {
      alert("카드 2장을 선택하세요.");
      return;
    }
    const userSum = selected.reduce((a, b) => a + b, 0);
    const pcSum = pcCards.reduce((a, b) => a + b, 0);
    if (userSum > pcSum) setResult("🎉 사용자 승!");
    else if (userSum < pcSum) setResult("💻 PC 승!");
    else setResult("🤝 무승부!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <div className="grid grid-cols-5 gap-4 bg-blue-500 p-4 rounded-xl mb-4">
        {userCards.map((num) => (
          <label
            key={num}
            className={`bg-orange-500 text-white p-4 rounded cursor-pointer ${
              selected.includes(num) ? "ring-4 ring-yellow-300" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(num)}
              onChange={() => handleCheck(num)}
              className="mr-2"
            />
            {num}
          </label>
        ))}
      </div>

      <div className="space-x-4 mb-4">
        <button
          onClick={handleStart}
          disabled={gameStarted}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          시작
        </button>
        <button
          onClick={handleSelect}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          선택
        </button>
        <button
          onClick={handleReset}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          리셋
        </button>
      </div>

      <p className="text-left text-sm text-gray-800 whitespace-pre-line border-t pt-2">
        카드: 1~20 숫자 카드. 중복 없음.{"\n"}
        시작을 누르면 PC는 미리 2개 번호를 부여받음.{"\n"}
        화면엔 5장 출력. 2장을 선택 후 선택 버튼 클릭.{"\n"}
        사용자 카드 합 vs PC 카드 합 비교 → 승자 결정.{"\n"}
        리셋은 모두 초기화. 시작은 게임 중 중복 불가.{"\n"}
        게임 종료 후 시작 다시 누르면 새 게임 진행.
      </p>

      {result && <p className="text-xl font-bold mt-4">{result}</p>}
    </div>
  );
}
