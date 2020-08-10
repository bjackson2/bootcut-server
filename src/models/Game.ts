import {GameRow} from '../types';

const STATUS_TYPES: Record<string, GameStatusType> = {
  0: 'CREATED',
  1: 'IN_PROGRESS',
  2: 'COMPLETED',
};

export type GameStatusType = 'CREATED' | 'IN_PROGRESS' | 'COMPLETED';

const assignStatus = (status: number): GameStatusType => STATUS_TYPES[status];
export const statusEnumValue = (status: GameStatusType): number =>
  Number(Object.keys(STATUS_TYPES).find(key => STATUS_TYPES[key] == status));

export default class Game {
  id: number;
  code: string;
  status: GameStatusType;
  duration: number | null;
  turnOrder: number[] | null;

  constructor(gameRow: GameRow) {
    this.id = gameRow.id;
    this.code = gameRow.code;
    this.status = assignStatus(gameRow.status);
    this.duration = gameRow.duration;
    this.turnOrder = gameRow.turn_order;
  }
}
