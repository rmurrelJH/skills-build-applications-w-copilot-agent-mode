import { Router } from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ points: -1, displayName: 1 });
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});
