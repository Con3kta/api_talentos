import mongoose from "mongoose";
//se der problema: bote "default: 'default value' " em todas as propriedades

const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true
    },

    password: {
      type: String
    },

    verifiedUser: {
      type: Boolean,
      default: false
    },

    name: {
      type: String
    },

    lastName: {
      type: String
    },

    github: {
      type: String
    },

    linkedin: {
      type: String
    },

    about: {
      type: String
    },

    location: {
      type: String
    },

    birth_date: {
      type: Date
    },

    gender: {
      type: String
    },

    phone: {
      type: String,
      unique: true
    },

    languages: {
      type: Array,
      default: ["Português"],
      items: {
        type: String
      }
    },

    photo: {
      type: String
    },

    scholar: {
      type: Array,
      default: [],
      items: {
        type: Object
      }
    },

    experience: {
      type: Array,
      default: [],
      items: {
        type: Object
      }
    },

    projects: {
      type: Array,
      default: [],
      items: {
        type: Object
      }
    },

    skills: {
      type: Array,
      default: [],
      items: {
        type: String
      }
    }
  })

export const Student = mongoose.model('Student', studentSchema)
