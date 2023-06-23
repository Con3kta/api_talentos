import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: "default value",
      unique: true,
    },
    password: {
      type: String,
      default: "default value",
    },
    verifiedUser: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: "default value"
    },
    lastName: {
      type: String,
      default: "default value"
    },
    github: {
      type: String,
      default: "default value"
    },
    linkedin: {
      type: String,
      default: "default value"
    },
    about: {
      type: String,
      default: "default value"
    },
    location: {
      type: String,
      default: "default value"
    },
    birth_date: {
      type: Date,
      default: Date.now(),
    },
    gender: {
      type: String,
      default: "default"
    },
    phone: {
      type: String,
      default: "default value",
      unique: true
    },
    languages: {
      type: Array,
      default: ["Português"],
      items: {
        type: String,
      },
    },
    photo: {
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
  })

export const Student = mongoose.model('Student', studentSchema)