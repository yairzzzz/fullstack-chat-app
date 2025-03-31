import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "isabella.brown@example.com",
    fullName: "Rivka",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },

  {
    email: "james.anderson@example.com",
    fullName: "Benny Weiess",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },

  {
    email: "lucas.moore@example.com",
    fullName: "Malkishua",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    fullName: "Mangistu Rata",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
