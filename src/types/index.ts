export interface BoardRow {
  id: number;
  row_number: number;
  activity_description: string;
}

export interface Context {
  db: Record<string, any>;
}

export interface Game {
  id: number;
  name: string;
  shortCode: string;
  boardRows: BoardRow[];
}

export interface GameArgs {
  id: number;
}
