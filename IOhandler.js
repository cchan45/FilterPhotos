/*
 * Project:
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: Nov 24
 * Author: Chris Chan
 *
 */

const unzipper = require("unzipper");
const fs = require("fs");
const fsPromise = require("fs").promises;
const PNG = require("pngjs").PNG;
const path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
        .pipe(unzipper.Extract({ path: pathOut }))
    resolve("Extraction operation complete")
  })
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fsPromise.readdir(dir)
        .then((content) => {
            const onlyZIP = content.filter(file => path.extname(file) === ".png")
            resolve(onlyZIP)
        })
        .catch((err) => reject(err))
  })
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
    fs.createReadStream(pathIn)
    .pipe(
      new PNG()
      )
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
              
            // invert color
            this.data[idx] = 255 - this.data[idx];
            this.data[idx + 1] = 255 - this.data[idx + 1];
            this.data[idx + 2] = 255 - this.data[idx + 2];
              
            // and reduce opacity
            this.data[idx + 3] = this.data[idx + 3] >> 1;
            }
          }
          this.pack().pipe(fs.createWriteStream(pathOut))
        })
        .on("error", (error) => {
          console.log(error)
      })
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
