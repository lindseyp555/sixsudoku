import React from "react";

export const Grid = () => {
  const rows = 6;
  const cols = 6;

  return (
    <div className="inline-block border-2 border-gray-800">
      {Array.from({ length: rows }).map((_, row) => (
        <div className="flex" key={row}>
          {Array.from({ length: cols }).map((_, col) => {
            // Determine bold borders for 2x3 sub-boxes
            const borderTop = row % 3 === 0 ? "border-t-4" : "border-t";
            const borderLeft = col % 2 === 0 ? "border-l-4" : "border-l";
            const borderRight = col === cols - 1 ? "border-r-4" : "border-r";
            const borderBottom = row === rows - 1 ? "border-b-4" : "border-b";

            // Shaded background for alternating 3x2 sub-boxes
            const rowBlock = Math.floor(row / 2);
            const colBlock = Math.floor(col / 3);
            const isShaded = (rowBlock + colBlock) % 2 === 0;

            return (
              <div
                key={`${row}-${col}`}
                className={`${borderTop} ${borderLeft} ${borderRight} ${borderBottom} border-gray-800 w-12 h-12 flex items-center justify-center ${
                  isShaded ? "bg-gray-200 dark:bg-gray-700" : ""
                }`}
              >
                {/* Optional number goes here */}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};