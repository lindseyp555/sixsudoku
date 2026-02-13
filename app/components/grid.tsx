import React from "react";

interface GridProps {
  puzzle: string[][];
}

export const Grid = ({puzzle}: GridProps) => {
  const rows = 6;
  const cols = 6;

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
              <div
                key={`${row}-${col}`}
                className={`${borderTop} ${borderLeft} ${borderRight} ${borderBottom} border-gray-400 w-12 h-12 flex items-center justify-center ${
                  isShaded ? "bg-gray-400 dark:bg-gray-800" : ""
                }`}
              >
                {cell}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};