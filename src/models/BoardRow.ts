import {BoardRowRow} from '../types';

export default class BoardRow {
  id: number;
  rowNumber: number;
  activityDescription: string;

  constructor(boardRowRow: BoardRowRow) {
    this.id = boardRowRow.id;
    this.rowNumber = boardRowRow.row_number;
    this.activityDescription = boardRowRow.activity_description;
  }
}
