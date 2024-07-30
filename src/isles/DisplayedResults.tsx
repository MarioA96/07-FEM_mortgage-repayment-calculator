import { cx, css } from "../../styled-system/css";
import { stack } from "../../styled-system/patterns";
import calculateRepayment from "../helpers/calculateRepayment";
import calculateInterestOnly from "../helpers/calculateInterestOnly";


type FormState = {
    mortgage_amount: number,
    mortgage_term: number,
    interest_rate: number,
    type: number
}

type Results = {
    monthlyRepayment: number,
    totalInterestPayable: number
}


export const DisplayedResults = ({ formState }: { formState: FormState }) => {

    const { mortgage_amount, mortgage_term, interest_rate, type } = formState;

    if (!mortgage_amount || !mortgage_term || !interest_rate) return null;
    if (isNaN(mortgage_amount) || isNaN(mortgage_term) || isNaN(interest_rate)) return null;
    if (mortgage_amount <= 0 || mortgage_term <= 0 || interest_rate <= 0) return null;
    if (interest_rate > 100) return null;

    let results = {
        monthlyRepayment: 0,
        totalInterestPayable: 0
    } as Results;

    if ( type == 1  ){
        results = calculateRepayment(mortgage_amount, mortgage_term, interest_rate, mortgage_term * 12);
    }else if ( type == 2 ){
        results = calculateInterestOnly(mortgage_amount, mortgage_term, interest_rate);
    }

    return (
        <>
            <div id="results-card" 
                className={ 
                    cx( 
                        css({ 
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "hsl(201, 54%, 16%)",
                            height: { xsm: '360px', lg: '100%' },
                            width: { xsm: '100%', lg: '100%' },
                            marginTop: { xsm: '20px', lg: '0px' },
                            paddingTop: { xsm: '10px', lg: '0px' },
                            borderRadius: { xsm: '0px', lg: '0 20px 20px 100px' },
                        }),
                        stack({ direction: { xsm: 'column' }, gap: '10px' })
                    ) 
                }
            >
                <div id="title-results"
                    className={ css({ 
                        width: { xsm: '85%' },
                        fontFamily: 'plusJakartaSans_regular',
                        fontWeight: '700',
                        fontSize: '20px',
                        color: 'white',
                        marginTop: { xsm: '10px' },
                        marginLeft: { xsm: '10px' },
                    }) }
                >
                    Your Results
                </div>
                <p
                    className={
                        css({
                            width: { xsm: '85%' },
                            fontFamily: 'plusJakartaSans_regular',
                            fontWeight: '700',
                            fontSize: '14px',
                            color: '#8ba8ba',
                            marginTop: { xsm: '10px' },
                            marginLeft: { xsm: '10px' },
                            marginRight: { xsm: '10px' },
                        })
                    }
                >
                    Your results are shown below based on the 
                    information you provided. To adjust the 
                    results, edit the form and click "calculate 
                    repayments" again.
                </p>
                <div className={ 
                        cx(
                            css({
                                display: 'flex',
                                height: { xsm: '170px' },
                                width: { xsm: '85%' },
                                borderRadius: '10px',
                                backgroundColor: 'hsl(202, 55%, 12%)',
                                boxShadow: '0px -10px 0px -4px rgba(226,215,0,1)',
                                marginTop: { xsm: '15px' },
                            }),
                            stack({ direction: { xsm: 'column' }, gap: '10px' })
                        )
                    }
                >
                    <div className={ cx( css({ height: { xsm: '60%' } }), stack({ direction: { xsm: 'column' } }) ) }>
                        <span id="monthly_repayment_title" className={ css({ color: '#8ba8ba', fontSize: '14px', fontFamily: 'plusJakartaSans_regular', paddingLeft: '20px', paddingTop: '10px' }) }>
                            Your monthly repayments
                        </span>
                        <span id="monthly_repayment" className={ css({ color: 'hsl(61, 70%, 52%)', fontSize: '32px', fontFamily: 'plusJakartaSans_regular', fontWeight: '500', paddingLeft: '20px' }) }>
                            £ { results.monthlyRepayment.toFixed(2) }
                        </span>
                    </div>

                    <hr className={ css({ color: 'gray.600', width: '85%', alignSelf: 'center' }) }/>

                    <div className={ cx( css({ height: { xsm: '40%' } }), stack({ direction: { xsm: 'column' } }) ) }>
                        <span id="total_repayment_title" className={ css({ color: '#8ba8ba', fontSize: '14px', fontFamily: 'plusJakartaSans_regular', paddingLeft: '20px' }) }>
                            Total you'll repay over the term
                        </span>
                        <span id="total_repayment" className={ css({ color: 'white', fontSize: '18px', fontFamily: 'plusJakartaSans_regular', fontWeight: '500', paddingLeft: '20px' }) }>
                            £ { results.totalInterestPayable.toFixed(2) }
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
};