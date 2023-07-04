import { Student } from "../models/Student.js";

export const admRoutes = (app) => {
    let message
    async function functionSelectStudent(property, target) {
        let query = {}
        query[property] = target

        const student = await Student.find(query)
        const quantity = student.length
        
        if (!Student.schema.obj
            .hasOwnProperty(property)) {
            message = "Nome de propriedade inexistente"
        }
        else if (property == "password") {
            message = "Acesso negado"
        } else {
            if (quantity > 0) {
                message = "Sucesso"
            } else {
                message = "Nenhum estudante encontrado"
            }
        }
        return { query: query, quantity: quantity, message: message, response: student }
    }

    async function functionEditStudent(query, data) {
        if (query.quantity > 1) {
            await Student.updateMany(
                query.query,
                { ...data }
            )
        }
        else if (query.quantity == 1) {
            await Student.updateOne(
                query.query,
                { ...data },
            )
        }
        return query
    }

    async function functionDeleteStudent(query) {
        if (query.quantity > 1) {
            await Student.deleteMany(
                query.query
            )
        }
        else if (query.quantity == 1) {
            await Student.deleteOne(
                query.query
            )
        }
        return query
    }

    app.patch("/edit_student/:property", async (req, res) => {
        try {
            const selectedStudent = await functionSelectStudent(
                req.params.property,
                req.body.target
            )
            const response = await functionEditStudent(
                selectedStudent,
                req.body
            )
            res.status(200).send(response)
        } catch (error) { res.json(error.message) }
    })

    app.get("/all_students", async (req, res) => {
        try {
            const response = await functionSelectStudent(
                "verifiedUser",
                "true"
            )
            res.status(200).send(response)
        } catch (error) { res.json(error.message) }
    })

    app.get("/search_student/:property", async (req, res) => {
        try {
            const response = await functionSelectStudent(
                req.params.property,
                req.body.target)
            res.status(200).json(response)
        } catch (error) { res.json(error.message) }
    })

    app.delete("/delete_student/:property", async (req, res) => {
        try {
            const selectedStudent = await functionSelectStudent(
                req.params.property,
                req.body.target
            )
            const response = await functionDeleteStudent(
                selectedStudent
            )
            res.status(200).send(response)
        } catch (error) { res.json(error.message) }
    })

    app.post("/raw_register", async (req, res) => {
        const data = req.body
        const quantity = data.length
        let message
        let createdStudent
        try {
            if (quantity == 1) {
                const creatingStudent = new Student(data[0])
                createdStudent = await creatingStudent.save()
            } else {
                createdStudent = await Student.insertMany(data)
            }
            message = "success"
            const response = { query: "raw registering", quantity: quantity, message: message, response: createdStudent }
            res.status(200).send(response)
        } catch (error) { res.json(error.message) }
    })
}