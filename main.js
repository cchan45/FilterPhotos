/*
 * Project:
 * File Name: main.js
 * Description:
 *
 * Created Date: Nov 24, 2021
 * Author: Chris Chan
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

  IOhandler.unzip(zipFilePath, pathUnzipped)
      .then(() => IOhandler.readDir(pathUnzipped))
      .then((onlyZIP) => IOhandler.grayScale(pathUnzipped, pathProcessed, onlyZIP))
      .then(() => console.log("Program Done"))
      .catch((err) => console.log(err))