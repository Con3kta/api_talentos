import mongoose from "mongoose";
export const Estudante = mongoose.model(
  "Estudante",
  {
    name: { type: String, default: "default value" },
    lastName: { type: String, default: "default value" },
    about: { type: String, default: "default value" },
    location: { type: String, default: "default value" },
    birth_date: {
      type: Date,
      default: Date.now(),
    },
    gender: { type: String, default: "default" },
    phone: {
      type: String,
      default: "default value",
      unique: true,
    },
    email: {
      type: String,
      default: "default value",
      unique: true,
    },
    photo: {
      type: String,
      default: "default value",
    },
    password: {
      type: String,
      default: "default value",
    },
    scholar: {
      type: Array,
      default: [],
      items: {
        type: Object,
      },
    },
    experience: {
      type: Array,
      default: [],
      items: {
        type: Object,
      },
    },
    projects: {
      type: Array,
      default: [],
      items: {
        type: Object,
      },
    },
    skills: {
      type: Array,
      default: [],
      items: {
        type: String,
      },
    },
  },
  "Estudantes"
);
