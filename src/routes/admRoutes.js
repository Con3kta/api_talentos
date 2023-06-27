import twilio from "twilio"
import { Student } from "../models/Student.js";

export const admRoutes = (app) => {
    app.get("/all_students", async (req, res) => {
        try {
            const allStudents = Student.find()
            console.log(allStudents)
            await res.send(allStudents)
        } catch (error) { res.send(error.message) }
    })
}