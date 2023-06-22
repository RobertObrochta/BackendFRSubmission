// check for alphaNum string (used for points from retailer)
const isAlphanumeric = (str) => {
    return /^[a-zA-Z0-9]+$/.test(str);
}

// per the rules, calculate the points from the given receipt
const calculatePoints = (receipt) => {
    let points = 0;
    const retailer = receipt["retailer"];
    const total = receipt["total"];
    const items = receipt["items"];
    const purchaseDate = receipt["purchaseDate"];
    const purchaseTime = receipt["purchaseTime"];
    for (let i = 0; i < retailer.length; i++){
        if (isAlphanumeric(retailer[i])){
            points += 1;
        }
    }

    const totalCents = total.substring(total.indexOf(".") + 1);
    if (totalCents == "00"){
        points += 50;
    }

    if (parseInt(totalCents) % 25 == 0){
        points += 25;
    }

    points += Math.floor(items.length / 2) * 5;

    for (let i = 0; i < items.length; i++){
        const desc = items[i]["shortDescription"].trim();
        if (desc.length % 3 == 0){
            const adjPrice = Math.ceil(parseFloat(items[i]["price"].trim()) * 0.2);
            points += adjPrice;
        }
    }

    const dayOfPurchase = parseInt(purchaseDate.substring(purchaseDate.lastIndexOf("-") + 1));
    if (dayOfPurchase % 2 != 0){
        points += 6;
    }

    const timeHours = parseInt(purchaseTime.substring(0, purchaseTime.indexOf(":")));
    if (timeHours >= 14 && timeHours <= 16){
        points += 10;
    }

    return points;
}

module.exports = calculatePoints;