import mongoose, { Document, Schema } from 'mongoose';

export interface IHistory extends Document {
  expression: string;
  result: string;
  timestamp: Date;
}

const HistorySchema: Schema = new Schema({
  expression: { type: String, required: true },
  result: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IHistory>('History', HistorySchema);
