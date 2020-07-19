export interface BoardRowRow {
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
  duration: number | null;
}

export interface GameParticipantRow {
  id: number;
  game_id: number;
  name: string;
  avatar_url: string;
  breakaway_count: number;
}
