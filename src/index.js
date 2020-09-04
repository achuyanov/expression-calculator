function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const multRegEx = /(?<!\d)-?[0-9.]+[\/*]-?[0-9.]+/;
    const sumRegEx = /(?<!\d)-?[0-9.]+[-+]-?[0-9.]+/;
    const brRegExp = /\(([0-9.\/*+-]+)\)/;
  
    const ex = expr.replace(/\s/g, '');
    const brExpr = ex.match(brRegExp);

    const leftBr = ex.match(/\(/g) && ex.match(/\(/g).length;
    const rightBr = ex.match(/\)/g) && ex.match(/\)/g).length;
    
    if (leftBr != rightBr) { 
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
    const strRegEx = /(-?[0-9.]+)([\/*+-])(-?[0-9.]+)/;
    const  strObj = str.match(strRegEx);
    //console.log(strObj);
    const [res, val1, op , val2] = strObj;
    const x = Number(val1);
    const y = Number(val2);
    if ((op === '/') && (y === 0)) { throw new Error('TypeError: Division by zero.');}
    const ret = (op==='*') ? (x*y) : (op=='/') ? (x/y) : (op==='+') ? (x+y) : (op==='-') ? (x-y) : null;
    return ret.toFixed(20);
}


module.exports = {
    expressionCalculator
}


//let a = " 58 * 85 * (  1 + 16 * 7 + (  82 * 31 * (  85 / 75 - 51 - 22  ) + 2 - 24  )  ) * 22 * (  27 + 67 + 0 + 93  ) ";
//const a = " 24 - 23 * 17 / (  93 + 52 * 70 * (  6 + 91 / (  (  4 / 39 / 8 * 30  ) / (  22 * 97 * (  32 * 20 * (  82 - 80 * 51 / 89 * 9  ) * 56 + 82  ) * 89  ) - 17 - 17  ) / 29 / 81  )  ) ";

//let b = expressionCalculator(a);      
//console.log(b);

//it("Nested brackets test 20", function() {
 // const expr = " 24 - 23 * 17 / (  93 + 52 * 70 * (  6 + 91 / (  (  4 / 39 / 8 * 30  ) / (  22 * 97 * (  32 * 20 * (  82 - 80 * 51 / 89 * 9  ) * 56 + 82  ) * 89  ) - 17 - 17  ) / 29 / 81  )  ) ";
 // const result = 23.9822;
 // expect(Number(expressionCalculator(expr).toFixed(4))).to.equal(result);
//});