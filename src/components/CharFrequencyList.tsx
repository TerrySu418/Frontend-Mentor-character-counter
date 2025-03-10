import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type CharFrequencyListProps = {
  text: string;
  charFreq: { [key: string]: number };
  initialValue?: number;
};

const CharFrequencyList = ({
  text,
  charFreq,
  initialValue = 5,
}: CharFrequencyListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length === 0) {
    return <p>No characters found. Start typing to see letter density</p>;
  }

  const charList = Object.keys(charFreq);

  const visibleChars = isExpanded ? charList : charList.slice(0, initialValue);

  return (
    <div>
      {visibleChars.map((char, index) => (
        <div className="flex justify-between items-center gap-4">
          <p className="w-4" key={index}>
            {char}
          </p>
          <div className="grow-1 bg-neutral-300 rounded-full h-3 relative">
            <div
              className="absolute top-0 left-0 bg-purple-500 h-full rounded-full"
              style={{
                width: `${((charFreq[char] / text.length) * 100).toFixed(2)}%`,
              }}
            ></div>
          </div>

          <p className="w-24 text-end">
            {charFreq[char]} (
            {((charFreq[char] / text.length) * 100).toFixed(2)})%
          </p>
        </div>
      ))}
      {charList.length > initialValue && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-800 hover:text-black flex items-center gap-1 transition-colors mt-4"
        >
          <span className="w-20 text-start">
            {isExpanded ? (
              <p className="text-lg">See Less</p>
            ) : (
              <p className="text-lg">See More</p>
            )}
          </span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      )}
    </div>
  );
};

export default CharFrequencyList;
