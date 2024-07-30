/*
    TO TEST ONLY FUNCTION
    Mortgage amount = MA => 300,000
    Mortgage term - years = MTY => 25
    Interest rate = IR => 5.25%

    Interest only = IO
    : = calculation mode

    Monthly repayments = MR
    Total interest payable = TIP

    IO: MR = ceil[(MA*IR/100)/12]
    IO: TIP = (MA*IR/100)*MTY
*/


const calculateMonthlyRepayment = (MA: number, IR: number) => {
    
    return Math.ceil( (MA * IR) / 1200 );
};


const calculateTotalInterestPayable = (MA: number, MTY: number, IR: number) => {

    return (MA * IR * MTY) / 100;
}


const calculateRepayment = (MA: number, MTY: number, IR: number) => {
    
    const monthlyRepayment = calculateMonthlyRepayment(MA, IR);
    const totalInterestPayable = calculateTotalInterestPayable(MA, MTY, IR);
    
    return {
        monthlyRepayment,
        totalInterestPayable
    };
};


export default calculateRepayment;

