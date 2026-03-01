import React, { useState, useEffect } from "react";
import Switch from "react-switch"

interface GridProps {
  puzzle: string[][];
  setPuzzle: React.Dispatch<React.SetStateAction<string[][]>>;
  clues: boolean[][];
  solution: number[][];
}

export const Grid = ({ puzzle, setPuzzle, clues, solution }: GridProps) => {
  const rows = 6;
  const cols = 6;

  const [showMistakes, setShowMistakes] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const handleSwitchChange = (nextChecked: boolean) => {
    setShowMistakes(nextChecked);
  };

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    if (/^[1-6]$|^$/.test(e.target.value)) {
      var newArray = [];
      for (var i = 0; i < puzzle.length; i++) {
        newArray[i] = puzzle[i].slice();
      }
      newArray[row][col] = e.target.value;
      setPuzzle(newArray);
    }
  };

  const isSolved =
    puzzle.length > 0 &&
    puzzle.every((row, r) =>
      row.every((cell, c) => cell !== "" && puzzle[r][c] == solution[r][c].toString())
    );

  useEffect(() => {
    if (isSolved) {
      setShowWinModal(true);
    }
  }, [isSolved]);

  return (
    <div className="flex flex-col items-center">
      <div className="inline-block border-2 border-gray-800">
        {puzzle.map((rowData, row) => (
          <div className="flex" key={row}>
            {rowData.map((cell, col) => {
              // Determine bold borders for 2x3 sub-boxes
              const borderTop = row % 3 === 0 ? "border-t-2" : "border-t-0.5";
              const borderLeft = col % 2 === 0 ? "border-l-2" : "border-l-0.5";
              const borderRight = col === cols - 1 ? "border-r-2" : "border-r";
              const borderBottom = row === rows - 1 ? "border-b-2" : "border-b";

              // Shaded background for alternating 3x2 sub-boxes
              const rowBlock = Math.floor(row / 2);
              const colBlock = Math.floor(col / 3);
              const isShaded = (rowBlock + colBlock) % 2 === 0;

              const userValue = puzzle[row][col];
              const solutionValue = solution[row][col];
              const isMistake = showMistakes && userValue !== "" && userValue !== solutionValue.toString();

              console.log("Cell", row, col, {
                userValue,
                solutionValue,
                isMistake
              });

              return (
                <input
                  key={`${row}-${col}`}
                  onChange={(e) => handleCellChange(e, row, col)}
                  disabled={clues[row][col] || isSolved}
                  className={`
                  ${borderTop} ${borderLeft} ${borderRight} ${borderBottom} text-center border-gray-400 w-12 h-12 flex items-center justify-center 
                  ${isShaded ? "bg-gray-400 dark:bg-gray-800" : ""}
                  ${clues[row][col]
                      ? "text-blue-400"
                      : isMistake
                        ? "text-red-500"
                        : "text-white"
                    }
                }`}
                  value={cell}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex flex-row p-5">
        <Switch
          checked={showMistakes}
          onChange={handleSwitchChange}
        />
        <p className="flex pl-4">Show mistakes</p>
      </div>
      {showWinModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow-lg text-black text-center">
            <h2 className="text-xl font-bold mb-4">🎉 You solved it!</h2>

            <button
              onClick={() => setShowWinModal(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};