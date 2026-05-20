import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userEmail: { type: String, required: true },
    displayName: { type: String, required: true },
    points: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
