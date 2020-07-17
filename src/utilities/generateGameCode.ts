const GAME_CODE_LENGTH = 5;
const ASCII_CHAR_START = 65;
const ASCII_CHAR_END = 90;

export default function generateGameCode(): string {
  const chars = [];
  for (let i = 0; i < GAME_CODE_LENGTH; i++) {
    chars.push(
      String.fromCharCode(
        Math.floor(
          Math.random() * (ASCII_CHAR_END - ASCII_CHAR_START) + ASCII_CHAR_START
        )
      )
    );
  }
  return chars.join('');
}
