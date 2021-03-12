/* function to sum all cash-in-drawer */
function sumCID (cid){
    let sum = 0;
    for (let i of cid) {
        sum += i[1];
    }
    return sum.toFixed(2);
}

 /* function to validate there are sufficient funds in the cash register,
    and provide change only if there are sufficient funds */
function checkCashRegister(price, cash, cid) {
    // declare variables, calculate change and cash-in-drawer
    let change = cash - price;
    let changeArray = [];
    let cidSum = sumCID(cid);
  
    // verify sufficient funds
    if (change > cidSum) {
        return { status: "INSUFFICIENT_FUNDS", change: changeArray };
    } 
    // verify register has just enough funds 
    if (change == cidSum){
        return { status: "CLOSED", change: cid};
    }
    // iterate through cash-in-drawer and collect change
    cid = cid.reverse();
    let i = 0;
    for (let c of cid) {
        let temp = [c[0], 0];
        while (change >= cashValue[i][1] && c[1] > 0) {
            temp[1] += cashValue[i][1];
            c[1] -= cashValue[i][1];
            c[1] = c[1].toFixed(2);
            change -= cashValue[i][1];
            change = change.toFixed(2);
            cidSum -= cashValue[i][1];
            cidSum = cidSum.toFixed(2);
        }      
    if (temp[1] > 0) {
        changeArray.push(temp);
    }
    i++;
    } 
    // return change or insufficient funds 
    return change > 0
        ?  { status: "INSUFFICIENT_FUNDS", change: [] }
        :  { status: "OPEN", change: changeArray};
}