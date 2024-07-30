import { cx, css } from "../../styled-system/css";
import { stack } from "../../styled-system/patterns";


export const NoDisplayedResults = () => {
    return (
        <>
            <div id="noresults-card" 
                className={ 
                    cx( 
                        css({ 
                            display: "flex",
                            justifyContent: "center",
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
                <div
                    className={
                        css({
                            display: 'flex',
                            justifyContent: 'center',
                            height: { xsm: '170px' },
                        })
                    }
                >
                    <img src="/07-FEM_mortgage-repayment-calculator/assets/images/illustration-empty.svg" alt="illustration" />
                </div>
                <div id="title-results"
                    className={ css({ 
                        fontFamily: 'plusJakartaSans_regular',
                        fontWeight: '700',
                        fontSize: '20px',
                        color: 'white',
                        textAlign: 'center',
                        marginTop: { xsm: '10px' },
                        marginLeft: { xsm: '10px' },
                    }) }
                >
                    Results shown here
                </div>
                <p
                    className={
                        css({
                            fontFamily: 'plusJakartaSans_regular',
                            fontWeight: '700',
                            fontSize: '14px',
                            color: '#8ba8ba',
                            textAlign: 'center',
                            marginTop: { xsm: '10px' },
                            marginLeft: { xsm: '10px' },
                            marginRight: { xsm: '10px' },
                        })
                    }
                >
                    Complete the form and click "calculate 
                    repayments" to see what your monthly 
                    repayments would be.
                </p>
            </div>
        </>
    )
};