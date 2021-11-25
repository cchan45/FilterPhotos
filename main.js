/*
 * Project:
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

  IOhandler.unzip(zipFilePath, pathUnzipped)
      .then((msg) => console.log(msg))
      .then(() => IOhandler.readDir(pathUnzipped))
      .then((onlyZIP) => {
          onlyZIP.forEach(file => {
              console.log(`${pathUnzipped}/${file}`)
              IOhandler.grayScale(`${pathUnzipped}/${file}`, `${pathProcessed}/new${file}`)
          })
      })
      .catch((err) => console.log(err))