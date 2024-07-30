/*
    TO TEST ONLY FUNCTION
    Mortgage amount = MA => 300,000
    Mortgage term - years = MTY => 25
    Interest rate = IR => 5.25%

    Capital repayment = CR
    : = calculation mode

    Monthly repayments = MR
    Total interest payable = TIP

    n = MTY * 12
    CR: MR = (MA*IR/1200)(((1+(IR/1200))^n)/((1+(IR/1200))^n)-1)
    CR: TIP = (MA*IR*MTY/100)(((1+(IR/1200))^n)/((1+(IR/1200))^n)-1)
*/


const calculateMonthlyRepayment = (MA: number, MTY: number, IR: number, n: number) => {
    const monthlyRate = IR / 1200;

    const numerator = (1 + monthlyRate ) ** n;
    const denominator = numerator - 1;
    const term = numerator / denominator;

    const result = MA * monthlyRate * term;

    return result;
};


const calculateTotalInterestPayable = (MA: number, MTY: number, IR: number, n: number) => {
    const monthlyRate = IR / 100;

    const numerator = (1 + (monthlyRate/12) ) ** n;
    const denominator = numerator - 1;
    const term = numerator / denominator;

    const result = MA * MTY * monthlyRate * term;

    return result;
}


const calculateRepayment = (MA: number, MTY: number, IR: number, n: number) => {
    
    const monthlyRepayment = calculateMonthlyRepayment(MA, MTY, IR, n);
    const totalInterestPayable = calculateTotalInterestPayable(MA, MTY, IR, n);
    
    return {
        monthlyRepayment,
        totalInterestPayable
    };
};


export default calculateRepayment;

// const MA = 300000;
// const MTY = 25;
// const IR = 5.25;
// const n = MTY * 12;
// const repayment = calculateRepayment(MA, MTY, IR, n);
// monthlyRepayment: 1797.74
// totalInterestPayable: 539322.94

// console.log(repayment);
