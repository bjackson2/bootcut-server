import {GameRow} from '../types';

const STATUS_TYPES: Record<string, string> = {
  0: 'CREATED',
  1: 'IN_PROGRESS',
  2: 'COMPLETED',
};

const assignStatus = (status: number): string => STATUS_TYPES[status];

export default class Game {
  id: number;
  code: string;
  status: string;
  duration: number | null;

  constructor(gameRow: GameRow) {
    this.id = gameRow.id;
    this.code = gameRow.code;
    this.status = assignStatus(gameRow.status);
    this.duration = gameRow.duration;
  }
}
