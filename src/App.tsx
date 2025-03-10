import { ModeToggle } from "./components/mode-toggle";
import logo from "./assets/images/logo-light-theme.svg";
import CharFrequencyList from "./components/CharFrequencyList";
import CharacterLimitForm from "./components/CharacterLimitForm";
import { useState, useEffect } from "react";
function App() {
  const [text, setText] = useState("");

  const [character, setCaracter] = useState<number>(0);
  const [charFreq, setCharFreq] = useState<{ [key: string]: number }>({});
  const [word, setWord] = useState<number>(0);
  const [sentence, setSentence] = useState<number>(0);

  const [excludeSpace, setExcludeSpace] = useState<boolean>(false);

  const getChar = excludeSpace ? text.replace(/\s/g, "") : text;

  useEffect(() => {
    if (getChar) {
      // Character frequency
      setCharFreq(() => {
        const newFeq: { [key: string]: number } = {};
        getChar
          .toUpperCase()
          .split("")
          .forEach((el) => (newFeq[el] = (newFeq[el] || 0) + 1));

        const sortedEntries = Object.entries(newFeq)
          .sort((a, b) => {
            // First, compare by frequency (descending)
            const frequencyDiff = b[1] - a[1];

            // If frequencies are equal, sort alphabetically
            if (frequencyDiff === 0) {
              return a[0].localeCompare(b[0]);
            }

            return frequencyDiff;
          })
          .reduce(
            (acc, [char, count]) => {
              acc[char] = count;
              return acc;
            },
            {} as { [key: string]: number }
          );

        return sortedEntries;
      });

      // Character count
      setCaracter(getChar.length);

      // Word count
      const words = text.trim().split(/\s+/);
      setWord(words.length);

      // Sentence count - improved regex to better handle sentence endings
      const sentences = text
        .trim()
        .split(/[.!?]+/)
        .filter((sentence) => sentence.length > 0)
        .map((sentence) => sentence.trim());
      setSentence(sentences.length);
    } else {
      // Reset all states when text is empty
      setCharFreq({});
      setCaracter(0);
      setWord(0);
      setSentence(0);
    }

    // Cleanup function
    return () => {
      setCharFreq({});
      setCaracter(0);
      setWord(0);
      setSentence(0);
    };
  }, [text, getChar]);

  const countFormat = (count: number) => {
    if (count === 0) return "00";
    if (count < 10) return `0${count}`;
    return count.toString();
  };

  return (
    <main className="flex-col flex-center min-h-screen w-[990px] mx-auto my-2">
      {/* Logo and Theme */}
      <div className="w-full flex justify-between">
        <img src={logo} />
        <ModeToggle />
      </div>

      {/* heading */}
      <h1 className="text-center mt-12">
        Analyze your text <br />
        <span>in real-time.</span>
      </h1>

      {/* checkbox */}
      <CharacterLimitForm
        excludeSpace={excludeSpace}
        setExcludeSpace={setExcludeSpace}
        text={text}
        setText={setText}
        word={word}
      />

      {/* status */}
      <div className="grid grid-cols-3 w-full gap-2 mt-12">
        <div className="flex justify-between bg-purple-500 flex-grow h-[150px] overflow-hidden rounded-[12px] relative">
          <div className="p-4 w-full z-20">
            {<h1>{countFormat(character)}</h1>}
            <h3>Total Characters(no space)</h3>
          </div>
          <div className="absolute right-0 bg-[url(/src/assets/images/pattern-character-count.svg)] bg-[position:center_left_30px] bg-no-repeat h-[150px] w-[150px] z-10"></div>
        </div>

        <div className="flex justify-between bg-yellow-500 flex-grow h-[150px] overflow-hidden rounded-[12px] relative">
          <div className="p-4 w-full z-20">
            {<h1>{countFormat(word)}</h1>}
            <h3>Word Count</h3>
          </div>
          <div className="absolute right-0 bg-[url(/src/assets/images/pattern-word-count.svg)] bg-[position:center_left_30px] bg-no-repeat h-[150px] w-[150px] z-10"></div>
        </div>

        <div className="flex justify-between bg-orange-500 flex-grow h-[150px] overflow-hidden rounded-[12px] relative">
          <div className="p-4 w-full z-20">
            {<h1>{countFormat(sentence)}</h1>}
            <h3>Sentence Count</h3>
          </div>
          <div className="absolute right-0 bg-[url(/src/assets/images/pattern-sentence-count.svg)] bg-[position:center_left_30px] bg-no-repeat h-[150px] w-[150px] z-10"></div>
        </div>
      </div>

      {/* footer */}
      <section className="flex flex-col w-full">
        <h2 className="my-4">Letter Density</h2>
        <CharFrequencyList
          text={getChar}
          charFreq={charFreq}
          initialValue={5}
        />
      </section>
    </main>
  );
}

export default App;
