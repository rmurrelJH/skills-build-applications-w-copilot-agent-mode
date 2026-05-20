import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, default: '' },
    memberCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Team = model('Team', teamSchema);
