import twilio from "twilio"
import { Student } from "../models/Student.js";

export const admRoutes = (app) => {

    async function functionSelectStudent(property, target) {
        let query = {}; query[property] = target

        if (!Student.schema.obj
            .hasOwnProperty(property)) {
            return "Nome de propriedade inexistente."
        }
        else if (property == "password") {
            return "Acesso negado."
        }

        const student = await Student.findOne(query)
        if (student) {
            return student.toObject()
        } else {
            return "Nenhum estudante com essa propriedade encontrado."
        }
    }
    async function functionEditStudent(query, data) {
        const editingStudent = await Student.findOneAndUpdate(
            query,
            { ...data },
            { new: true }
        )
        const savedStudent = await editingStudent.save()
        return savedStudent

    }
    app.patch("/edit_student/:property", async (req, res) => {
        try {
            const selectedStudent = await functionSelectStudent(req.params.property, req.body.target)
            const response = await functionEditStudent(selectedStudent, req.body)
            res.status(200).json({ message: "Estudante editado com sucesso", response })

        } catch (error) { res.json(error.message) }
    })

    app.get("/all_students", async (req, res) => {
        try {
            const response = await Student.find()
            res.status(200).json(response.student.toObject())
        } catch (error) { res.json(error.message) }
    })

    app.get("/search_student/:property", async (req, res) => {
        try {
            const response = await functionSelectStudent(req.params.property, req.body.target)
            res.status(200).json({ response })
        } catch (error) { res.json(error.message) }
    })

    app.delete("/delete_student/:property", async (req, res) => {
        try {
            const response = await functionSelectStudent(req.params.property, req.body.target)

            if (typeof response === 'object') {
                await Student.deleteOne(response)
                res.status(200).json({ message: "Estudante deletado", response })
            } else {
                res.status(200).json({ response })
            }
        } catch (error) { res.json(error.message) }
    })
}