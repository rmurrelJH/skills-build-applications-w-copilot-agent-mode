import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userEmail: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Activity = model('Activity', activitySchema);
