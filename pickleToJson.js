
const pickle = require('pickle');
const fs = require('fs');
const path = require('path');

console.log(process.argv, process.cwd());

const file = path.join(process.cwd(), process.argv[process.argv.length - 1]);
const content = fs.readFileSync(file);

pickle.loads(content, (res) => {
    console.log(res);
    fs.writeFileSync(`${file}.json`, JSON.stringify(res));
});