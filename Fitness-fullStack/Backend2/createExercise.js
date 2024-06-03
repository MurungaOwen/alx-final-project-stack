import { MongoClient } from 'mongodb';

// Replace the following URL with your MongoDB connection string
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const data = [
      {
        name: "Pull-Up",
        bodyPart: "back",
        secondaryMuscles: ["Biceps", "Shoulders"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/11/archer-pull-up.gif"
      },
      {
        name: "Deadlift",
        bodyPart: "back",
        secondaryMuscles: ["Hamstrings", "Glutes"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2021/10/how-to-deadlift.gif"
      },
      {
        name: "Bent Over Row",
        bodyPart: "back",
        secondaryMuscles: ["Biceps", "Lats"],
        gifUrl: "https://i.pinimg.com/originals/78/96/d9/7896d944ba4cd105ec876221e692155e.gif"
      },
      {
        name: "Running",
        bodyPart: "cardio",
        secondaryMuscles: ["Legs", "Core"],
        gifUrl: "https://www.cdn.spotebi.com/wp-content/uploads/2014/10/run-in-place-exercise-illustration.gif"
      },
      {
        name: "Jump Rope",
        bodyPart: "cardio",
        secondaryMuscles: ["Legs", "Arms"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/03/jump-rope.gif"
      },
      {
        name: "Cycling",
        bodyPart: "cardio",
        secondaryMuscles: ["Legs", "Glutes"],
        gifUrl: "https://i.pinimg.com/originals/be/0a/4e/be0a4e1500127ea8ddfbae0335d14d2f.gif"
      },
      {
        name: "Push-Up",
        bodyPart: "chest",
        secondaryMuscles: ["Triceps", "Shoulders"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/04/reverse-grip-push-ups.gif"
      },
      {
        name: "Bench Press",
        bodyPart: "chest",
        secondaryMuscles: ["Triceps", "Shoulders"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/05/incline-barbell-bench-press.gif"
      },
      {
        name: "Chest Fly",
        bodyPart: "chest",
        secondaryMuscles: ["Shoulders"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/04/cable-cross-over.gif"
      },
      {
        name: "Wrist Curl",
        bodyPart: "lower arms",
        secondaryMuscles: ["Forearms"],
        gifUrl: "https://i.pinimg.com/originals/5f/1b/3c/5f1b3cbf305d96c2b5de63519104bf81.gif"
      },
      {
        name: "Reverse Wrist Curl",
        bodyPart: "lower arms",
        secondaryMuscles: ["Forearms"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/08/dumbbell-reverse-curl.gif"
      },
      {
        name: "Hammer Curl",
        bodyPart: "lower arms",
        secondaryMuscles: ["Biceps"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/02/cross-body-hammer-curl.gif"
      },
      {
        name: "Calf Raise",
        bodyPart: "lower legs",
        secondaryMuscles: ["Calves"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/03/dumbbell-calf-raise.gif"
      },
      {
        name: "Seated Calf Raise",
        bodyPart: "lower legs",
        secondaryMuscles: ["Calves"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/10/weighted-calf-raise.gif"
      },
      {
        name: "Standing Calf Raise",
        bodyPart: "lower legs",
        secondaryMuscles: ["Calves"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/03/cable-standing-calf-raise.gif"
      },
      {
        name: "Neck Flexion",
        bodyPart: "neck",
        secondaryMuscles: ["Traps"],
        gifUrl: "https://gymvisual.com/img/p/9/1/7/0/9170.gif"
      },
      {
        name: "Neck Extension",
        bodyPart: "neck",
        secondaryMuscles: ["Traps"],
        gifUrl: "https://i.pinimg.com/originals/17/90/5d/17905dc2fda2f75d7099e41f12695541.gif"
      },
      {
        name: "Neck Lateral Flexion",
        bodyPart: "neck",
        secondaryMuscles: ["Traps"],
        gifUrl: "https://homegymreview.co.uk/wp-content/uploads/exercises/18401101-Neck-Flexor-And-Rotational-Stretch_Neck_max-scaled.jpg"
      },
      {
        name: "Shoulder Press",
        bodyPart: "shoulders",
        secondaryMuscles: ["Triceps"],
        gifUrl: "https://homeworkouts.org/wp-content/uploads/anim-dumbbell-shoulder-press.gif"
      },
      {
        name: "Lateral Raise",
        bodyPart: "shoulders",
        secondaryMuscles: ["Deltoids"],
        gifUrl: "https://i.pinimg.com/originals/6b/54/93/6b54938fc0cbe1ba3b72502dffae901b.gif"
      },
      {
        name: "Front Raise",
        bodyPart: "shoulders",
        secondaryMuscles: ["Deltoids"],
        gifUrl: "https://www.barbellfrontraise.com/wp-content/uploads/2022/05/how-to-do-a-front-dumbbell-raise-correctly-1.gif"
      },
      {
        name: "Bicep Curl",
        bodyPart: "upper arms",
        secondaryMuscles: ["Forearms"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/10/bayesian-curl.gif"
      },
      {
        name: "Tricep Dip",
        bodyPart: "upper arms",
        secondaryMuscles: ["Triceps"],
        gifUrl: "https://i.pinimg.com/originals/e4/29/bb/e429bb7c9759c7415bdb7f7474752dd9.gif"
      },
      {
        name: "Tricep Extension",
        bodyPart: "upper arms",
        secondaryMuscles: ["Triceps"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2021/10/cable-tricep-pushdown.gif"
      },
      {
        name: "Squat",
        bodyPart: "upper legs",
        secondaryMuscles: ["Glutes", "Hamstrings"],
        gifUrl: "https://homeworkouts.org/wp-content/uploads/anim-dumbbell-goblet-squats.gif"
      },
      {
        name: "Lunge",
        bodyPart: "upper legs",
        secondaryMuscles: ["Glutes", "Quadriceps"],
        gifUrl: "https://static.wixstatic.com/media/42934c_243e14e0c86744cab410ffbc0c20ece5~mv2.gif"
      },
      {
        name: "Leg Press",
        bodyPart: "upper legs",
        secondaryMuscles: ["Quadriceps", "Glutes"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/03/single-leg-leg-press.gif"
      },
      {
        name: "Crunch",
        bodyPart: "waist",
        secondaryMuscles: ["Abs"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/crunch.gif"
      },
      {
        name: "Plank",
        bodyPart: "waist",
        secondaryMuscles: ["Core"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/plank-movement.gif"
      },
      {
        name: "Russian Twist",
        bodyPart: "waist",
        secondaryMuscles: ["Obliques"],
        gifUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2021/12/how-to-do-a-kettlebell-russian-twist.gif"
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
