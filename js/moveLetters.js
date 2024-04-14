function moveLetter(lst, position, direction) {
    if (direction.toLowerCase() === 'f') {
        lst.unshift(lst.splice(position, 1)[0]);
    } else if (direction.toLowerCase() === 'b') {
        lst.push(lst.splice(position, 1)[0]);
    } else {
        console.log("Invalid direction. Please enter 'f' for front or 'b' for back.");
    }
}

function main() {
    let letters = ['a', 'b', 'c', 'd', 'e'];  // Initial list of letters

    console.log("Initial list of letters:", letters);

    while (true) {
        console.log("\nCurrent list:", letters);
        let position = parseInt(prompt("Enter the position of the letter you want to move (1 to " + letters.length + "): ")) - 1;
        let direction = prompt("Enter 'f' to move to front or 'b' to move to back: ");

        moveLetter(letters, position, direction);

        console.log("Updated list:", letters);
    }
}

main();
