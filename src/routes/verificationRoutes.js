import twilio from "twilio"
import { Student } from "../models/Student.js";

export const verificationRoutes = (app) => {
  //variaveis globais para funcionamento da API Twilio
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const verifySid = process.env.TWILIO_VERIFY_SID
  const client = twilio(accountSid, authToken);

  app.post("/send_email", async (req, res) => {
    try {
      let exist
      let email = req.body.email
      //verifica se o email ja existe no DB
      exist = await Student.findOne({ email: email })
      if (exist) {
        return res.status(409)
          .send({ message: "email ja existe: abortar cadastro" });
      }
      else if (!exist) {
        const verification = await client.verify.v2.services(verifySid)
          .verifications.create({
            channelConfiguration: {
              template_id: 'd-0fcd8d7ac1ef41b4a7bd948e5fa04f3f',
              from: 'teamcon3kta@gmail.com',
              from_name: 'Con3kta'
            }, to: email, channel: 'email'
          })
        const verificationStatus = verification.status
        console.log(`verification.status: ${verificationStatus}`)
        res.status(202).json({
          message: "email inserido é novo: code-email ENVIADO com sucesso",
          response: verificationStatus
        })
      }
    } catch (error) { res.send(error.message) }
  })

  app.post("/check_email", async (req, res) => {
    try {
      let email = req.body.email
      let otpCode = req.body.code

      const verification_check = await client.verify.v2.services(verifySid)
        .verificationChecks
        .create({ to: email, code: otpCode })

      const verificationCheckStatus = verification_check.status

      //caso o codigo verificado por email seja aprovado, cria o Student por enquanto apenas com o email:
      if (verificationCheckStatus == "approved") {
        const newStudent = new Student({
          email: email,
          verifiedUser: true
        })
        const savedStudent = await newStudent.save()

        res.status(202).json({
          message: "Email salvo como um Email verificado",
          response: savedStudent
        })
      } else {
        res.status(202).json({
          message: "Código por email não verificado: tente novamente"
        })
      }
    } catch (error) { res.send(error.message) }
  })


  app.post("/register", async (req, res) => {
    try {
      const email = req.body.email
      const data = req.body
      const selectedStudent = await Student.findOne({ email: email })
      // caso o email exista e seja verificado:
      if (selectedStudent) {
        if (selectedStudent.verifiedUser === true) {
          const newStudent = await Student.findOneAndUpdate(
            // selecionando email
            { email: email },
            // inserindo os dados
            { ...data },
            { new: true }
          )
          const savedStudent = await newStudent.save()

          res.send({
            message: "Registro de dados completo com sucesso",
            response: savedStudent
          })
        } else if (selectedStudent.verifiedUser === false) {
          res.send({ message: "Email não verificado: abortar cadastro" });
        }
      } else {
        res.send({ message: "Email não encontrado" });
      }
    } catch (error) { res.send(error.message) }
  })

  app.post("/change_password_send", async (req, res) => {
    try {
      const email = req.body.email

      // procura no banco de dados se o usuario existe
      const exist = await Student.findOne({ email: email }).count()

      if (exist == 1) { // verifica se algum usuario foi encontrado
        // funcao que envia o codigo para o email
        const verification = await client.verify.v2.services(verifySid)
          .verifications.create({
            channelConfiguration: {
              template_id: 'd-0fcd8d7ac1ef41b4a7bd948e5fa04f3f',
              from: 'teamcon3kta@gmail.com',
              from_name: 'Con3kta'
            }, to: email, channel: 'email'
          })
        res.status(200).send({ message: "código de verificação enviado para o email" })
      } else if (exist == 0) { // verifica se algum usuario foi encontrado
        res.status(404).send({ message: "email não existente" })
      }

    } catch (error) { res.status(500).send(error) }
  })

  app.post("/change_password_check", async (req, res) => {
    try {
      const otpCode = req.body.code
      const email = req.body.email
      const newPassword = req.body.newPassword

      const verification_check = await client.verify.v2.services(verifySid).verificationChecks.create({ to: email, code: otpCode })

      if (verification_check.status == "approved") { // verificacao se o codigo esta certo
        const user = await Student.updateOne({ email: email }, { $set: { password: newPassword } })
        res.status(202).send({ message: "Senha alterada com sucesso" })
      } else {
        res.status(401).send({ message: "Código de verificação incorreto" })
      }
    } catch (error) { res.status(500).send(error) }
  })

}