const fs = require("fs");

let option = process.argv[2];
//console.log(process.argv[0]);

switch (option) {
  case "read":
    read();
    break;
  case "create":
    create();
    //console.log("create selected");
    break;
  case "update":
    update();
    //console.log("update selected");
    break;
  case "destroy":
    destroy();
    console.log("destroy selected");
    break;
  default:
    usage();
}

function read() {
  fs.readFile("pets.json", "utf8", function (error, data) {
    let index = process.argv[3];
    if (error) {
      console.log(error);
    } else if (index < JSON.parse(data).length) {
      console.log(JSON.parse(data)[index]);
    } else if (index >= JSON.parse(data).length) {
      console.log(`Usage: node pets.js read INDEX`);
    } else {
      console.log(JSON.parse(data));
    }
  });
}

function create() {
  let age = process.argv[3];
  let kind = process.argv[4];
  let name = process.argv[5];

  if (process.argv.length < 6) {
    console.log(`Usage: node pets.js create AGE KIND NAME`);
  } else {
    fs.readFile("pets.json", "utf8", function (error, data) {
      if (error) {
        console.log(error);
      } else {
        let obj = JSON.parse(data);
        obj.push({
          age: parseInt(age),
          kind: kind,
          name: name,
        });
        //console.log(obj);
        let json = JSON.stringify(obj);
        fs.writeFile("pets.json", json, "utf8", function (error) {
          if (error) {
            console.log(error);
          }
        });
      }
    });
  }
}

function update() {
  let index = process.argv[3];
  let age = process.argv[4];
  let kind = process.argv[5];
  let name = process.argv[6];

  if (process.argv.length !== 7) {
    console.log(`Usage: node pets.js udpate INDEX AGE KIND NAME`);
  } else {
    fs.readFile("pets.json", "utf8", function (error, data) {
      if (error) {
        console.log(error);
      } else {
        let obj = JSON.parse(data);
        obj[index].age = parseInt(age);
        obj[index].kind = kind;
        obj[index].name = name;
        //console.log(obj);
        let json = JSON.stringify(obj);
        fs.writeFile("pets.json", json, "utf8", function (error) {
          if (error) {
            console.log(error);
          }
        });
      }
    });
  }
}

function destroy() {
  let index = process.argv[3];

  if (process.argv.length !== 4) {
    console.log(`Usage: node pets.js destroy INDEX`);
  } else {
    fs.readFile("pets.json", "utf8", function (error, data) {
      if (error) {
        console.log(error);
      } else {
        let obj = JSON.parse(data);
        obj.splice(index, 1);
        //console.log(obj);
        let json = JSON.stringify(obj);
        fs.writeFile("pets.json", json, "utf8", function (error) {
          if (error) {
            console.log(error);
          }
        });
      }
    });
  }
}

function usage() {
  console.error(`Usage: node pets.js [read | create | udpate | destroy]`);
}
