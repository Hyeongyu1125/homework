import React from "react";
import CardGame from "./CardGame";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">숫자 카드 게임</h1>
        <CardGame />
      </div>
    </div>
  );
}

export default App;
