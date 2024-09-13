const CONTROL_VALUE = "a";

const padWithControlValue = (length: number): string => {
  return Array.from({ length }).fill(CONTROL_VALUE).join("");
};

const getNextCharacter = (char: string, step: number): string => {
  return String.fromCharCode(char.charCodeAt(0) + step);
};

const findIndexToChange = (
  upsideRank: string,
  downsideRank: string
): number => {
  let index = 0;

  while (upsideRank[index] === downsideRank[index]) {
    index++;
  }

  return index;
};

export const getMiddleRank = (
  upsideRank?: string,
  downsideRank?: string
): string => {
  if (!upsideRank && downsideRank) {
    return getNextCharacter(downsideRank[0], -1) + downsideRank.slice(1);
  }

  if (upsideRank && !downsideRank) {
    return getNextCharacter(upsideRank[0], 1) + upsideRank.slice(1);
  }

  if (!upsideRank || !downsideRank) {
    return padWithControlValue(9)
      .split("")
      .map((char, index) => (index === 4 ? "b" : char))
      .join("");
  }

  let indexToChange = findIndexToChange(upsideRank, downsideRank);

  if (
    getNextCharacter(upsideRank![indexToChange], 1) ===
    downsideRank![indexToChange]
  ) {
    indexToChange++;
  }

  const nextCharacter = getNextCharacter(
    upsideRank[indexToChange] || CONTROL_VALUE,
    1
  );

  return (
    upsideRank.slice(0, indexToChange) +
    nextCharacter +
    upsideRank.slice(indexToChange + 1)
  );
};
