// rascunho: só falta otimizar os returns pra nao ter que repetir o objeto inteiro toda vez em cada return e sim somente as propriedades necessarias

import twilio from "twilio"
import { Student } from "../models/Student.js";

export const admRoutes = (app) => {

    async function functionSelectStudent(property, target) {
        let query = {}
        query[property] = target

        const student = await Student.find(query)
        const quantity = student.length
        let message

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
}