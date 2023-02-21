export default function animateNumber(number: any) {
    const characters = number.length;
    
    let randomNumber = "";
    for (let i = 0; i < characters; i++) {
        if (!isNaN(number[i])) {
            randomNumber += Math.floor(Math.random() * 10);
        } else {
            randomNumber += number[i];
        }
    }
    return randomNumber
}