import twilio from "twilio"
import sgMail from '@sendgrid/mail';
import express from "express";
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
        console.log(`Email não verificado: bad ending`)
        res.send({ message: `Email não verificado` })
      }
    } catch (error) { res.send(error.message) }
  })

app.post("/register_main", async (req, res) => {
  try{
    
  } catch (error) {

  }
})
}