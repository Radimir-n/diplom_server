const express = require("express");
const cors = require("cors");

const nodemailer = require("nodemailer");

const server = express();

server.use(express.json());

server.use(cors());

// Эндпоинт для отправки сообщения на почту
server.post("/send-email", (req, res) => {
  try {
    const { name, email, comment } = req.body;
    const myEmail = "nafikovradimir@gmail.com";
    const password = "zfkq rsrb gzxn itgo";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: myEmail,
        pass: password,
      },
    });
    const mailOptions = {
      from: myEmail,
      to: email,
      subject: `Вопрос по оценке`,
      text: `Здравствуйте ${name} ваша заявка по поводу вопроса ${comment} \n принята, ожидайте ответа.`,
    };
    transporter.sendMail(mailOptions);
    return res.json();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// запуск сервера
server.listen(8000, () => {
  console.log("server is running on 8000 port");
});
