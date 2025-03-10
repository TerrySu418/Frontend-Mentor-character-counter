import { ChangeEvent, useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";

interface CharacterLimitFormProps {
  excludeSpace: boolean;
  setExcludeSpace: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  word: number;
}

const CharacterLimitForm = ({
  excludeSpace,
  setExcludeSpace,
  text,
  setText,
  word,
}: CharacterLimitFormProps) => {
  const [error, setError] = useState<boolean>(false);
  const [enableCharLimit, setEnableCharLimit] = useState<boolean>(false);
  const [charLimit, setCharLimit] = useState<string>("200");
  const [approx, setApprox] = useState(0);

  const handleTextInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (enableCharLimit) {
      const count = excludeSpace
        ? newText.replace(/\s/g, "").length
        : newText.length;

      setError(count > parseInt(charLimit, 10));
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    const calculateReadingTime = (word: number) => {
      if (!word) return 0;
      const elstimate = Math.ceil(word / 225);
      setApprox(elstimate);
    };

    calculateReadingTime(word);
    return () => {
      setApprox(0);
    };
  }, [word]);

  return (
    <div className="flex-col flex-center w-full mt-6">
      <Textarea
        value={text}
        onChange={handleTextInput}
        className={`h-50 w-full p-2 border rounded-md min-h-32 bg-neutral-100 resize-none disabled:focus ${error ? "border-orange-500" : ""}`}
        placeholder="Enter your text here..."
      />

      <div className="w-full h-[20px]">
        {error && (
          <span className="text-sm text-red-500">
            <span className="inline-flex items-center justify-center h-4 w-4 rounded-full border border-red-500 text-red text-xs font-medium">
              i
            </span>
            &nbsp;Limit reached! Your text exceed {charLimit} characters
          </span>
        )}
      </div>
      <div className="flex justify-between w-full">
        {/* Checkbox */}
        <div className="flex justify-between w-full h-[29px]">
          <div className="flex-center items-center justify-center gap-4">
            <Checkbox
              id=""
              checked={excludeSpace}
              onClick={() => setExcludeSpace(!excludeSpace)}
            />
            <label
              htmlFor="terms1"
              className=" peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Exclude Spaces
            </label>

            <Checkbox
              id=""
              checked={enableCharLimit}
              onClick={() => setEnableCharLimit(!enableCharLimit)}
            />
            <label
              htmlFor="terms1"
              className=" peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Set Character Limit
            </label>
            {enableCharLimit && (
              <input
                type="number"
                id="charLimit"
                value={charLimit}
                onChange={(e) => setCharLimit(e.target.value)}
                className="w-20 px-2 border border-gray-300 rounded-md text-sm h-[40px]"
                min="1"
              />
            )}
          </div>

          <p>
            Approx. reading time:{" "}
            <span className={approx > 0 ? "" : "hidden"}>&lt;</span>
            {approx} minute
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterLimitForm;
