import mongoose from 'mongoose';
import { ObjectId } from 'typeorm';
export enum TaskStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export const TaskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  description: { type: String },
  incentive: { type: Number, required: true },
  visual_context: { type: String },
  expires: { type: Number, require: true },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.PENDING,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

export interface Task {
  id: string;
  task: string;
  description: string;
  incentive: string;
  visual_context: string;
  expires: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  status: TaskStatus;
}
