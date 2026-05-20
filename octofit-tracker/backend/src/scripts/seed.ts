import dotenv from 'dotenv';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

dotenv.config();

async function seedDatabase(): Promise<void> {
  // Seed the octofit_db database with test data.
  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ]);

  await Team.insertMany([
    { name: 'Octo Runners', mascot: 'Velocity', memberCount: 2 },
    { name: 'Core Coders', mascot: 'Commit', memberCount: 2 }
  ]);

  await User.insertMany([
    { name: 'Mona Octocat', email: 'mona@example.com', team: 'Octo Runners' },
    { name: 'Hubot Helper', email: 'hubot@example.com', team: 'Core Coders' }
  ]);

  await Activity.insertMany([
    { userEmail: 'mona@example.com', activityType: 'Running', durationMinutes: 32 },
    { userEmail: 'hubot@example.com', activityType: 'Cycling', durationMinutes: 45 }
  ]);

  await LeaderboardEntry.insertMany([
    { userEmail: 'mona@example.com', displayName: 'Mona Octocat', points: 1280 },
    { userEmail: 'hubot@example.com', displayName: 'Hubot Helper', points: 1140 }
  ]);

  await Workout.insertMany([
    {
      title: 'Starter Strength Circuit',
      description: 'A balanced full-body circuit for new Octofit users.',
      difficulty: 'beginner',
      durationMinutes: 25
    },
    {
      title: 'Endurance Builder',
      description: 'A steady cardio-focused session for weekly progression.',
      difficulty: 'intermediate',
      durationMinutes: 40
    }
  ]);

  await disconnectDatabase();
}

seedDatabase()
  .then(() => {
    console.log('Seed data loaded into octofit_db');
  })
  .catch(async (error) => {
    console.error('Failed to seed octofit_db', error);
    await disconnectDatabase();
    process.exit(1);
  });
