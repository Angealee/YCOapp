import { useMemo, useState } from "react";

type WordSearchItem = {
  id: string;
  sentence: string;
  answer: string;
};

type Placement = {
  itemId: string;
  word: string;
  cells: Array<{ row: number; col: number }>;
};

type BoardBuild = {
  board: string[][];
  placements: Placement[];
  size: number;
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const sanitizeWord = (input: string): string =>
  input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

const randomLetter = () => LETTERS[Math.floor(Math.random() * LETTERS.length)];

const isPrefixPath = (
  prefix: Array<{ row: number; col: number }>,
  target: Array<{ row: number; col: number }>
): boolean => {
  if (prefix.length > target.length) return false;
  for (let i = 0; i < prefix.length; i++) {
    if (prefix[i].row !== target[i].row || prefix[i].col !== target[i].col) {
      return false;
    }
  }
  return true;
};

const buildBoard = (items: Array<{ id: string; word: string }>): BoardBuild => {
  const maxWordLength = items.reduce((max, item) => Math.max(max, item.word.length), 0);
  const size = Math.max(8, Math.min(14, Math.max(maxWordLength + 2, items.length * 2 + 2)));
  const board = Array.from({ length: size }, () => Array.from({ length: size }, () => ""));
  const placements: Placement[] = [];
  const directions = [
    { dr: 0, dc: 1 },
    { dr: 1, dc: 0 },
    { dr: 1, dc: 1 },
  ];

  const canPlace = (word: string, row: number, col: number, dr: number, dc: number) => {
    for (let i = 0; i < word.length; i++) {
      const r = row + dr * i;
      const c = col + dc * i;
      if (r < 0 || c < 0 || r >= size || c >= size) return false;
      if (board[r][c] && board[r][c] !== word[i]) return false;
    }
    return true;
  };

  for (const item of items) {
    let placed = false;
    for (let attempt = 0; attempt < 300 && !placed; attempt++) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (!canPlace(item.word, row, col, dir.dr, dir.dc)) continue;

      const cells: Array<{ row: number; col: number }> = [];
      for (let i = 0; i < item.word.length; i++) {
        const r = row + dir.dr * i;
        const c = col + dir.dc * i;
        board[r][c] = item.word[i];
        cells.push({ row: r, col: c });
      }
      placements.push({ itemId: item.id, word: item.word, cells });
      placed = true;
    }
  }

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!board[row][col]) board[row][col] = randomLetter();
    }
  }

  return { board, placements, size };
};

interface WordSearchFillBlankGameProps {
  title?: string;
  items: WordSearchItem[];
}

const WordSearchFillBlankGame: React.FC<WordSearchFillBlankGameProps> = ({ title, items }) => {
  const preparedItems = useMemo(
    () =>
      items
        .map((item) => ({ ...item, clean: sanitizeWord(item.answer) }))
        .filter((item) => item.clean.length > 1),
    [items]
  );

  const game = useMemo(
    () => buildBoard(preparedItems.map((item) => ({ id: item.id, word: item.clean }))),
    [preparedItems]
  );

  const [currentPath, setCurrentPath] = useState<Array<{ row: number; col: number }>>([]);
  const [foundIds, setFoundIds] = useState<Record<string, boolean>>({});
  const [foundCells, setFoundCells] = useState<Record<string, boolean>>({});

  const placementsById = useMemo(() => {
    const map: Record<string, Placement | undefined> = {};
    game.placements.forEach((placement) => {
      map[placement.itemId] = placement;
    });
    return map;
  }, [game.placements]);

  const renderItems = useMemo(
    () => preparedItems.filter((item) => !!placementsById[item.id]),
    [preparedItems, placementsById]
  );

  const handleCellClick = (row: number, col: number) => {
    const remainingPlacements = game.placements.filter((p) => !foundIds[p.itemId]);
    if (!remainingPlacements.length) return;
    const selected = [...currentPath, { row, col }];
    const matches = remainingPlacements.filter((placement) =>
      isPrefixPath(selected, placement.cells)
    );

    if (!matches.length) {
      const startMatches = remainingPlacements.filter((placement) =>
        isPrefixPath([{ row, col }], placement.cells)
      );
      setCurrentPath(startMatches.length ? [{ row, col }] : []);
      return;
    }

    const solved = matches.find((placement) => placement.cells.length === selected.length);
    if (solved) {
      const nextFoundIds = { ...foundIds, [solved.itemId]: true };
      const nextFoundCells = { ...foundCells };
      solved.cells.forEach((cell) => {
        nextFoundCells[`${cell.row}-${cell.col}`] = true;
      });
      setFoundIds(nextFoundIds);
      setFoundCells(nextFoundCells);
      setCurrentPath([]);
      return;
    }

    setCurrentPath(selected);
  };

  if (!preparedItems.length || !game.size) return null;

  return (
    <div className="word-search-game">
      <h3 className="word-search-title">{title ?? "Puzzle Game: Search Word"}</h3>
      <p className="word-search-subtitle">
        Hanapin ang salita sa grid. I-tap ang bawat letra sa tamang pagkakasunod para mapunan ang blanko.
      </p>

      <div className="word-search-fill-list">
        {renderItems.map((item) => {
          const placement = placementsById[item.id];
          const isSolved = !!foundIds[item.id];
          const placeholder = "_".repeat(Math.max(placement?.word.length ?? 4, 4));
          const [before = "", after = ""] = item.sentence.split("{blank}");
          return (
            <p key={`fill-${item.id}`} className="word-search-fill-item">
              {before}
              <span className={`answer-blank ${isSolved ? "solved" : ""}`}>
                {isSolved ? item.answer : placeholder}
              </span>
              {after}
            </p>
          );
        })}
      </div>

      <div
        className="word-search-grid"
        style={{ gridTemplateColumns: `repeat(${game.size}, minmax(0, 1fr))` }}
      >
        {game.board.map((rowLetters, rowIndex) =>
          rowLetters.map((char, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const isInCurrentPath = currentPath.some(
              (cell) => cell.row === rowIndex && cell.col === colIndex
            );
            const isFound = !!foundCells[key];
            const className = [
              "word-search-cell",
              isInCurrentPath ? "active" : "",
              isFound ? "found" : "",
            ]
              .join(" ")
              .trim();
            return (
              <button
                key={key}
                type="button"
                className={className}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {char}
              </button>
            );
          })
        )}
      </div>

    </div>
  );
};

export default WordSearchFillBlankGame;
