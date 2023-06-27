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
        console.log(`verification.status: ${verification.status}`)
        res.status(202).send({ "message": "email inserido é novo: code-email ENVIADO com sucesso" })
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
      console.log(`verification_check.status: ${verification_check.status}`)

      //caso o codigo verificado por email seja aprovado, cria o Student por enquanto apenas com o email:
      if (verification_check.status == "approved") {
        const newStudent = new Student({
          email: email,
          verifiedUser: true
        })
        const savedStudent = await newStudent.save()
        console.log(`Email salvo como um Email verificado: ${savedStudent}`)
        res.send({ message: `Email salvo como um Email verificado: ${savedStudent}` })
      } else {
        console.log(`Código por email não verificado: tente novamente.`)
        res.send({ message: `Código por email não verificado: tente novamente.` })
      }
    } catch (error) { res.send(error.message) }
  })

  // atentar que algumas propriedades sao array
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
            console.log(`Registro de dados completo com sucesso: ${savedStudent}`)
            res.send({ message: `Registro de dados completo com sucesso: ${savedStudent}` })
          } else if (selectedStudent.verifiedUser === false) {
            res.send({ message: "Email não verificado: abortar cadastro" });
          }
        } else {
          res.send({ message: "Email não encontrado" });
        }
    } catch (error) { res.send(error.message) }
  })

  app.post("/change_password_part1", async (req, res) => {
    try{
      const email = req.body.email
  
      // procura no banco de dados se o usuario existe
      const exist = await Student.findOne({ email: email }).count()
      
      if (exist == 1) { // verifica se algum usuario foi encontrado
        // funcao q enviao o codigo para o email
        const verification = await client.verify.v2.services(verifySid)
        .verifications.create({
          channelConfiguration: {
            template_id: 'd-0fcd8d7ac1ef41b4a7bd948e5fa04f3f',
            from: 'teamcon3kta@gmail.com',
            from_name: 'Con3kta'
          }, to: email, channel: 'email'
        })
        res.status(200).send({ message: "confirmation code sent to email box" })
      } else if (exist == 0) { // verifica se algum usuario foi encontrado
        res.status(404).send({ message: "Email not registered" })
      }
      
    } catch (error) { res.status(500).send(error) }
  })
  
  app.post("/change_password_part2", async (req, res) => {
    try{
      const otpCode = req.body.code
      const email = req.body.email
      const newPassword = req.body.newPassword
  
      const verification_check = await client.verify.v2.services(verifySid).verificationChecks.create({ to: email, code: otpCode })
      
      if (verification_check.status == "approved") { // verificacao se o codigo esta certo
        const user = await Student.updateOne({ email: email }, { $set: { password: newPassword } })
        res.status(202).send({ message: "Successfully changed password" })
      } else {
        res.status(401).send({ message: "Incorrect verification code" })
      }
      
    } catch (error) { res.status(500).send(error) }
  })

}