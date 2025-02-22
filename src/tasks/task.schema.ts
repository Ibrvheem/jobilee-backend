import mongoose from 'mongoose';
import { ObjectId } from 'typeorm';
export enum TaskStatus {
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export const TaskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  description: { type: String },
  incentive: { type: Number, required: true },
  visual_context: { type: String },
  location: { type: String, required: true },
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
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  },
  declinedBy: { type: [mongoose.Schema.Types.ObjectId], required: false },
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
  location: string;
  expires: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  acceptedBy: string;
  declinedBy: string[];
  status: TaskStatus;
}
