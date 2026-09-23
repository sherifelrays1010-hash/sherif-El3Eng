const fs = require("fs");
const EventEmitter = require("events");

const emitter = new EventEmitter();

let file1Content = "";
let file2Content = "";
let filesRead = 0;

fs.readFile("file1.txt", "utf8", (err, data) => {
    if (err) throw err;
    file1Content = data;
    filesRead++;
    if (filesRead === 2) {
        emitter.emit("filesReady");
    }
});

fs.readFile("file2.txt", "utf8", (err, data) => {
    if (err) throw err;
    file2Content = data;
    filesRead++;
    if (filesRead === 2) {
        emitter.emit("filesReady");
    }
});

emitter.on("filesReady", () => {
    const mergedContent = file1Content + "\n" + file2Content;

    fs.writeFile("merged.txt", mergedContent, "utf8", (err) => {
        if (err) throw err;
    console.log("Megered successfully")    });
});
