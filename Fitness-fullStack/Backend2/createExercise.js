import { MongoClient } from 'mongodb';

// Replace the following URL with your MongoDB connection string
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const data = [
      {
        name: "Pull-Up",
        bodyPart: "back",
        secondaryMuscles: ["Biceps", "Shoulders"],
        gifUrl: "https://example.com/pull-up.gif"
      },
      {
        name: "Deadlift",
        bodyPart: "back",
        secondaryMuscles: ["Hamstrings", "Glutes"],
        gifUrl: "https://example.com/deadlift.gif"
      },
      {
        name: "Bent Over Row",
        bodyPart: "back",
        secondaryMuscles: ["Biceps", "Lats"],
        gifUrl: "https://example.com/bent-over-row.gif"
      },
      {
        name: "Running",
        bodyPart: "cardio",
        secondaryMuscles: ["Legs", "Core"],
        gifUrl: "https://example.com/running.gif"
      },
      {
        name: "Jump Rope",
        bodyPart: "cardio",
        secondaryMuscles: ["Legs", "Arms"],
        gifUrl: "https://example.com/jump-rope.gif"
      },
      {
        name: "Cycling",
        bodyPart: "cardio",
        secondaryMuscles: ["Legs", "Glutes"],
        gifUrl: "https://example.com/cycling.gif"
      },
      {
        name: "Push-Up",
        bodyPart: "chest",
        secondaryMuscles: ["Triceps", "Shoulders"],
        gifUrl: "https://example.com/push-up.gif"
      },
      {
        name: "Bench Press",
        bodyPart: "chest",
        secondaryMuscles: ["Triceps", "Shoulders"],
        gifUrl: "https://example.com/bench-press.gif"
      },
      {
        name: "Chest Fly",
        bodyPart: "chest",
        secondaryMuscles: ["Shoulders"],
        gifUrl: "https://example.com/chest-fly.gif"
      },
      {
        name: "Wrist Curl",
        bodyPart: "lower arms",
        secondaryMuscles: ["Forearms"],
        gifUrl: "https://example.com/wrist-curl.gif"
      },
      {
        name: "Reverse Wrist Curl",
        bodyPart: "lower arms",
        secondaryMuscles: ["Forearms"],
        gifUrl: "https://example.com/reverse-wrist-curl.gif"
      },
      {
        name: "Hammer Curl",
        bodyPart: "lower arms",
        secondaryMuscles: ["Biceps"],
        gifUrl: "https://example.com/hammer-curl.gif"
      },
      {
        name: "Calf Raise",
        bodyPart: "lower legs",
        secondaryMuscles: ["Calves"],
        gifUrl: "https://example.com/calf-raise.gif"
      },
      {
        name: "Seated Calf Raise",
        bodyPart: "lower legs",
        secondaryMuscles: ["Calves"],
        gifUrl: "https://example.com/seated-calf-raise.gif"
      },
      {
        name: "Standing Calf Raise",
        bodyPart: "lower legs",
        secondaryMuscles: ["Calves"],
        gifUrl: "https://example.com/standing-calf-raise.gif"
      },
      {
        name: "Neck Flexion",
        bodyPart: "neck",
        secondaryMuscles: ["Traps"],
        gifUrl: "https://example.com/neck-flexion.gif"
      },
      {
        name: "Neck Extension",
        bodyPart: "neck",
        secondaryMuscles: ["Traps"],
        gifUrl: "https://example.com/neck-extension.gif"
      },
      {
        name: "Neck Lateral Flexion",
        bodyPart: "neck",
        secondaryMuscles: ["Traps"],
        gifUrl: "https://example.com/neck-lateral-flexion.gif"
      },
      {
        name: "Shoulder Press",
        bodyPart: "shoulders",
        secondaryMuscles: ["Triceps"],
        gifUrl: "https://example.com/shoulder-press.gif"
      },
      {
        name: "Lateral Raise",
        bodyPart: "shoulders",
        secondaryMuscles: ["Deltoids"],
        gifUrl: "https://example.com/lateral-raise.gif"
      },
      {
        name: "Front Raise",
        bodyPart: "shoulders",
        secondaryMuscles: ["Deltoids"],
        gifUrl: "https://example.com/front-raise.gif"
      },
      {
        name: "Bicep Curl",
        bodyPart: "upper arms",
        secondaryMuscles: ["Forearms"],
        gifUrl: "https://example.com/bicep-curl.gif"
      },
      {
        name: "Tricep Dip",
        bodyPart: "upper arms",
        secondaryMuscles: ["Triceps"],
        gifUrl: "https://example.com/tricep-dip.gif"
      },
      {
        name: "Tricep Extension",
        bodyPart: "upper arms",
        secondaryMuscles: ["Triceps"],
        gifUrl: "https://example.com/tricep-extension.gif"
      },
      {
        name: "Squat",
        bodyPart: "upper legs",
        secondaryMuscles: ["Glutes", "Hamstrings"],
        gifUrl: "https://example.com/squat.gif"
      },
      {
        name: "Lunge",
        bodyPart: "upper legs",
        secondaryMuscles: ["Glutes", "Quadriceps"],
        gifUrl: "https://example.com/lunge.gif"
      },
      {
        name: "Leg Press",
        bodyPart: "upper legs",
        secondaryMuscles: ["Quadriceps", "Glutes"],
        gifUrl: "https://example.com/leg-press.gif"
      },
      {
        name: "Crunch",
        bodyPart: "waist",
        secondaryMuscles: ["Abs"],
        gifUrl: "https://example.com/crunch.gif"
      },
      {
        name: "Plank",
        bodyPart: "waist",
        secondaryMuscles: ["Core"],
        gifUrl: "https://example.com/plank.gif"
      },
      {
        name: "Russian Twist",
        bodyPart: "waist",
        secondaryMuscles: ["Obliques"],
        gifUrl: "https://example.com/russian-twist.gif"
      }
      // Add more exercises up to 10 for waist
    ]

async function run() {
  try {
    await client.connect();
    const database = client.db('fitness');
    const collection = database.collection('exercises');

    for (const oneData of data){
        const result = await collection.insertOne(oneData);
        console.log(`Data inserted with the id: ${result.insertedId}`);
    }


  } finally {
    await client.close();
  }
}

run().catch(console.dir);
