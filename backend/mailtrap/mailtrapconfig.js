import {MailtrapClient} from "mailtrap"
import dotenv from "dotenv"
dotenv.config()

const TOKEN = process.env.MAILTRAP_TOKEN
// const ENDPOINT = "https://send.api.mailtrap.io"

export const client = new MailtrapClient({
  token: TOKEN,

});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};


