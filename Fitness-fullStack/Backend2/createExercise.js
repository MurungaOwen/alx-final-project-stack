import { MongoClient } from 'mongodb';

// Replace the following URL with your MongoDB connection string
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const data = [
      {
        name: "Pull-Up",
        bodyPart: "back",
        secondaryMuscles: ["Biceps", "Shoulders"],
        gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXZhdTRjNWNqMmlrMGxvOGl1bG9ka2p2d29ia3dldWxxZzh6Njg5NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8NLlhCIQQOBzCGbWjy/giphy.gif"
      },
      {
        name: "Deadlift",
        bodyPart: "back",
        secondaryMuscles: ["Hamstrings", "Glutes"],
        gifUrl: "https://media.giphy.com/media/xT0xenc4lKQlhf1Ohi/giphy.gif?cid=790b7611200bcvdwe4so66r89j3srsywwnblte1c282ga1gb&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Bent Over Row",
        bodyPart: "back",
        secondaryMuscles: ["Biceps", "Lats"],
        gifUrl: "https://media.giphy.com/media/KfTgl5LzZ4PzIZk0ot/giphy.gif?cid=790b7611jvzizupr403vwbxt805rzhdur74q9k3xy678kwnh&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Running",
        bodyPart: "cardio",
        secondaryMuscles: ["Legs", "Core"],
        gifUrl: "https://media.giphy.com/media/kdK6LZGCQxoJGeKPos/giphy.gif?cid=ecf05e47zyl1flt5zabjlhjqqtre9x1tyjwrc9h3yxcl0509&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Jump Rope",
        bodyPart: "cardio",
        secondaryMuscles: ["Legs", "Arms"],
        gifUrl: "https://media.giphy.com/media/13mpq8Az1u5dTy/giphy.gif?cid=790b76113qpmjrqom59mwgjf4p2e6oacz5m6qbs3vwcrx98a&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Cycling",
        bodyPart: "cardio",
        secondaryMuscles: ["Legs", "Glutes"],
        gifUrl: "https://media.giphy.com/media/p3qOJa4kAwlEbsKpAH/giphy.gif?cid=790b7611h499uuhgvhpj2xthygnzcrldn7whg9tes2khvmjz&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Push-Up",
        bodyPart: "chest",
        secondaryMuscles: ["Triceps", "Shoulders"],
        gifUrl: "https://media.giphy.com/media/UoNdY74noaG5VtE2bv/giphy.gif?cid=790b7611tkrca9hb73saeln4ollen63c56z8sypievng1e8m&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Bench Press",
        bodyPart: "chest",
        secondaryMuscles: ["Triceps", "Shoulders"],
        gifUrl: "https://media.giphy.com/media/13Xp7ZZiRU4Hzq/giphy.gif?cid=790b761103sdzsjgw7z5sqh9btz80czmrgerds2181wc9vqz&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Chest Fly",
        bodyPart: "chest",
        secondaryMuscles: ["Shoulders"],
        gifUrl: "https://media.giphy.com/media/13Xp7ZZiRU4Hzq/giphy.gif?cid=790b761103sdzsjgw7z5sqh9btz80czmrgerds2181wc9vqz&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Wrist Curl",
        bodyPart: "lower arms",
        secondaryMuscles: ["Forearms"],
        gifUrl: "https://media.giphy.com/media/6M4ZmZ4ZG6gk4PJnat/giphy.gif?cid=790b76113a4gfesd72kfdqzyy13nxhivqr0cer53dk7fc78t&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Reverse Wrist Curl",
        bodyPart: "lower arms",
        secondaryMuscles: ["Forearms"],
        gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJiejc5Njc1dnpmbXU0bGkwMTk3Y2NyemdrMDNpYXkwaTFycWIybyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/RhSifsHdqHrbWVtSJj/giphy.gif"
      },
      {
        name: "Hammer Curl",
        bodyPart: "lower arms",
        secondaryMuscles: ["Biceps"],
        gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGg4cHl6MmpjdXRpODJpMGh4MWhwem5meDhtODU2ZGdhNm1ueXNvYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dAy49uNPslC0TmuNa4/giphy.gif"
      },
      {
        name: "Calf Raise",
        bodyPart: "lower legs",
        secondaryMuscles: ["Calves"],
        gifUrl: "https://media.giphy.com/media/ag3OazmTmNfgFbcq4u/giphy.gif?cid=790b7611ozozl3i1czu714e34krhznycit6h2zi7kpodr27c&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Seated Calf Raise",
        bodyPart: "lower legs",
        secondaryMuscles: ["Calves"],
        gifUrl: ""
      },
      {
        name: "Standing Calf Raise",
        bodyPart: "lower legs",
        secondaryMuscles: ["Calves"],
        gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjM2ZDN4cTJpMDQ3M3B2cWExcmJ0a2txZjZzaXV2NTR6ZThzcTlvMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ehL7WCDG3cR4YjfMlX/giphy.gif"
      },
      {
        name: "Neck Flexion",
        bodyPart: "neck",
        secondaryMuscles: ["Traps"],
        gifUrl: "https://media.giphy.com/media/z3d7DULQGlgPGdR9GI/giphy.gif?cid=790b76118tpw39l8p3hnbeqxmd1nsrrj57lehxedsfkkubl1&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Neck Extension",
        bodyPart: "neck",
        secondaryMuscles: ["Traps"],
        gifUrl: "https://media.giphy.com/media/3o7TKx654t1CNu1OPC/giphy.gif?cid=790b7611hdq9qx47xoljp6xms14hamy9wv1iefuls3g7vr8r&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Neck Lateral Flexion",
        bodyPart: "neck",
        secondaryMuscles: ["Traps"],
        gifUrl: "https://media.giphy.com/media/3o7TKx654t1CNu1OPC/giphy.gif?cid=790b7611gicku68iy5gfpts64hu9n98j7uhmpz42qhhjs5a1&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Shoulder Press",
        bodyPart: "shoulders",
        secondaryMuscles: ["Triceps"],
        gifUrl: "https://media.giphy.com/media/1qrNKzsgcZtGMkI4pn/giphy.gif?cid=790b76115tbz7nyy5acddutzf6oj6sql9gktiqhdwnzdngog&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Lateral Raise",
        bodyPart: "shoulders",
        secondaryMuscles: ["Deltoids"],
        gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDF4bmM0dGV3aWw0a2V0dXFkbDBteXpkbjF2bmg4YjQyNDhub3dldyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rmlERmsODCF0l13Sqe/giphy.gif"
      },
      {
        name: "Front Raise",
        bodyPart: "shoulders",
        secondaryMuscles: ["Deltoids"],
        gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjc4a3h2b3pzN3NyaTNycTRubmt3MTlvbXJkcWtrMTZidTRhZTRtaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/38UgQApdrpsxM6HgEF/giphy.gif"
      },
      {
        name: "Bicep Curl",
        bodyPart: "upper arms",
        secondaryMuscles: ["Forearms"],
        gifUrl: "https://media.giphy.com/media/bXD1umxvzfu2QAgFAB/giphy.gif?cid=790b7611jsxq7rkahxbekycsgmu9g54q2mj4tbnliq89uy63&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Tricep Dip",
        bodyPart: "upper arms",
        secondaryMuscles: ["Triceps"],
        gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDlubmJxaHU4Z3AzeDhscDZnNXc0bDdvZzYzanMwYTZvMnJ5azVldSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/wKdb2xwADyl3hQZmZh/giphy.gif"
      },
      {
        name: "Tricep Extension",
        bodyPart: "upper arms",
        secondaryMuscles: ["Triceps"],
        gifUrl: "https://media.giphy.com/media/W7dBXzbnEpOBG/giphy.gif?cid=ecf05e472ubeag9a24583jycek5536djv9ewn6ldg1aq3v9h&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Squat",
        bodyPart: "upper legs",
        secondaryMuscles: ["Glutes", "Hamstrings"],
        gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGZiYTc1bzRodGlncHc1cnhqa21wMGpweHRjaGxsMWFyZGNxNTkwbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUPGcJGpd7ALzeLUOY/giphy.gif"
      },
      {
        name: "Lunge",
        bodyPart: "upper legs",
        secondaryMuscles: ["Glutes", "Quadriceps"],
        gifUrl: "https://media.giphy.com/media/ddR8T7OIILMK8H2YEh/giphy.gif?cid=790b7611pqhrt016wq2o809qiajlq2yqa4jvsxhx0i11hzkk&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Leg Press",
        bodyPart: "upper legs",
        secondaryMuscles: ["Quadriceps", "Glutes"],
        gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExems1bXR3aDd0Y2ZxcXpjeGJ0NHUwN2hveDh0ZHl0ZnF2Ym1jNGM2cyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/UIze7SZJbFQ6u4SP6E/giphy.gif"
      },
      {
        name: "Crunch",
        bodyPart: "waist",
        secondaryMuscles: ["Abs"],
        gifUrl: "https://media.giphy.com/media/lOrveiwNUJ8SwxJZuG/giphy.gif?cid=790b7611et2hjrp51x3mww15qfmg7290tuaff24sxswmpkl1&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Plank",
        bodyPart: "waist",
        secondaryMuscles: ["Core"],
        gifUrl: "https://media.giphy.com/media/LSLA6v5k8K1TvLyYKq/giphy.gif?cid=790b76113pnszo51zymmlerxudvf5cjr4y5lsuxg7j2xnv9k&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      },
      {
        name: "Russian Twist",
        bodyPart: "waist",
        secondaryMuscles: ["Obliques"],
        gifUrl: "https://media.giphy.com/media/IeqQbwJECfI3GmUmZ5/giphy.gif?cid=790b76112pov6xh829sfxsqcdusiqxg363e2ygk8gf4n3la1&ep=v1_gifs_search&rid=giphy.gif&ct=g"
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
