function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let multRegEx = /(?<!\d)-?[0-9.]+[\/*]-?[0-9.]+/;
    let sumRegEx = /(?<!\d)-?[0-9.]+[-+]-?[0-9.]+/;
    let brRegExp = /\(([0-9.\/*+-]+)\)/;
  
    let ex = expr.replace(/\s/g, '');
    let brExpr = ex.match(brRegExp);

    let leftBr = ex.match(/\(/g) && ex.match(/\(/g).length;
    let rightBr = ex.match(/\)/g) && ex.match(/\)/g).length;
    
    if (leftBr !== rightBr) { 
      throw new Error('ExpressionError: Brackets must be paired');
    } else if (brExpr) {
      const res = ex.replace(brRegExp, (match, expression) => expressionCalculator(expression));
      return expressionCalculator(res);
    }
  
    if (ex.match(multRegEx)) {
      const res = ex.replace(multRegEx, (strObj) => calc(strObj));
      return expressionCalculator(res);
    }
  

    if (ex.match(sumRegEx)) {
      const res = ex.replace(sumRegEx, (strObj) => calc(strObj));
      return expressionCalculator(res);
    }
  
    return Number(expr);
}


function calc(str) {
    let strRegEx = /(-?[0-9.]+)([\/*+-])(-?[0-9.]+)/;
    let  strObj = str.match(strRegEx);
   // console.log(strObj);
    let [res, val1, op , val2] = strObj;
    let x = Number(val1);
    let y = Number(val2);
    if ((op == '/') && (y == 0)) { throw new Error('TypeError: Devision by zero.');}
    let ret = (op=='*') ? (x*y) : (op=='/') ? (x/y) : (op=='+') ? (x+y) : (op=='-') ? (x-y) : null;
    return ret;//.toFixed(20);
}


module.exports = {
    expressionCalculator
}


//let a = " 58 * 85 * (  1 + 16 * 7 + (  82 * 31 * (  85 / 75 - 51 - 22  ) + 2 - 24  )  ) * 22 * (  27 + 67 + 0 + 93  ) ";
//let b = expressionCalculator(a);      
//console.log(b);