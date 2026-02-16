import React from "react";

interface GridProps {
  puzzle: string[][];
  setPuzzle:  React.Dispatch<React.SetStateAction<string[][]>>;
  clues: boolean[][];
}

export const Grid = ({ puzzle, setPuzzle, clues }: GridProps) => {
  const rows = 6;
  const cols = 6;

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    var newArray = [];
    for (var i = 0; i < puzzle.length; i++) {
      newArray[i] = puzzle[i].slice();
    }
    newArray[row][col] = e.target.value;
    setPuzzle(newArray);
  };

  return (
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

            return (
              <input 
                key={`${row}-${col}`}
                onChange={(e) => handleCellChange(e, row, col)}
                disabled={clues[row][col]}
                className={`
                  ${borderTop} ${borderLeft} ${borderRight} ${borderBottom} text-center border-gray-400 w-12 h-12 flex items-center justify-center 
                  ${isShaded ? "bg-gray-400 dark:bg-gray-800" : ""}
                  ${clues[row][col] ? "text-blue-400" : "text-white"}
                  disabled:text-blue-400
                  
                }`}
                value={cell}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};