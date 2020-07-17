export interface BoardRow {
  id: number;
  row_number: number;
  activity_description: string;
}

export interface Context {
  db: Record<string, any>;
}

export interface GameRow {
  id: number;
  code: string;
  status: number;
}
