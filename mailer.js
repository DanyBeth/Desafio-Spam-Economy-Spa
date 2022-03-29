//Ejercicio guiado: Servidor para correos electrónicos: Parte A

const nodemailer = require("nodemailer");
// Paso 1: Crear una función llamada “enviar” que reciba como parámetro los valores de “to”, “subject” y “text”.
function enviar(to, subject, html) {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sala10javascriptprueba@gmail.com",
      pass: "pruebajavascript",
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  let mailOptions = {
    from: "sala10javascriptprueba@gmail.com",
    to,
    subject,
    html,
  };
  
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log(err);
    if (data) console.log(data);
  });

}

// Paso 2: Exportar la función enviar como un módulo.
module.exports = enviar;