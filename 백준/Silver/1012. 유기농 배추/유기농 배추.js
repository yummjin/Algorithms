const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath, "utf8").toString().trim().split("\n");

const solution = () => {
    let index = 1
    while (index < input.length) {
        // console.log(`index: ${index}`)
        const [x, y, n] = input[index].split(" ").map(Number);
        // console.log(`x: ${x}, y: ${y}, z: ${n}`)

        let groupCnt = 0;

        const field = Array.from({ length: y }, () => Array(x).fill(0));

        for (let i = index + 1; i <= index + n; i++) {
            const [x, y] = input[i].split(" ").map(Number);
            field[y][x] = 1;
        }

        for (let x = 0; x < field.length; x++) {
            for (let y = 0; y < field[0].length; y++) {
                if (field[x][y] === 1) {
                    groupCnt++;
                    field[x][y] = -1;
                    findGroup(x, y, field);
                }
            }
        }

        // printField(field)

        console.log(groupCnt === 0 ? n : groupCnt);
        index = index + n + 1
    }

};

function findGroup(x, y, field) {
    const n = field.length;
    const m = field[0].length;

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX < 0 || newY < 0 || newX >= n || newY >= m) continue;


        if (newX >= 0 && newY >= 0) {
            if (field[newX][newY] === 0) continue;

            if (field[newX][newY] === 1) {
                field[newX][newY] = -1;
                findGroup(newX, newY, field);
            }
        }

    }

}

// function printField(field) {
//     for (const f of field) {
//         f.forEach((v) => process.stdout.write(String(v)))
//         console.log()
//     }
// }


solution();
