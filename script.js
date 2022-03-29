const axios = require("axios");
const http = require("http");
const url = require("url");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const enviar = require("./mailer");

async function indicadores() {
  const { data } = await axios.get("https://mindicador.cl/api");
  return data;
}

http
  .createServer(function (req, res) {

    let { correos, asunto, contenido } = url.parse(req.url, true).query;

    if (req.url == "/") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      fs.readFile("./index.html", "utf8", (err, html) => {
        res.end(html);
      });
    }

    if (req.url.startsWith("/mailing")) {
      correos !== "" && asunto !== "" && contenido !== "" && correos.includes(",")
        ? indicadores().then((results) => {
            let dolar = results.dolar.valor;
            let euro = results.euro.valor;
            let uf = results.uf.valor;
            let utm = results.utm.valor;
            let template = `<div><ul><li>El valor del dólar el día de hoy es: ${dolar}</li><li>El valor del euro el día de hoy es: ${euro}</li><li>El valor del uf el día de hoy es: ${uf}</li><li>El valor del utm el día de hoy es: ${utm}</li></ul></div>`;
            let id = uuidv4().slice(0, 6);
            enviar(correos.split(","), asunto, `${contenido} ${template}`);
            fs.writeFile(`./correos/${id}.txt`, template, 'utf8', () => {
              console.log(`El registro n° ${id} ha sido guardado en la carpeta correos.`)
            });
          })
        : res.write("Faltan campos por llenar, se está intentando un correo con solo 1 dirección o varios sin separarlos por coma");
        res.write("Correo enviado con éxito");
        res.end();
    }

  })
  .listen(3000, () => console.log("Escuchando el puerto 3000"));
