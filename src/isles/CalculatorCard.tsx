import { useState } from "react";

import { ResultsSection } from "./ResultsSection";

import { css, cva, cx } from "../../styled-system/css";
import { container, flex, grid, gridItem, stack } from "../../styled-system/patterns";

const calculator_card = cva({
    base: {
        width: '95%',
        '& #title_calculator': {
            fontFamily: 'plusJakartaSans_regular',
            fontWeight: 'bold',
            fontSize: '24px',
            color: 'slate.700'
        },
        '& #button_resetFields': {
            fontSize: '14px',
        }
    },
})

const label = cva({
    base: {
        fontFamily: 'plusJakartaSans_regular',
        fontSize: '14px',
        fontWeight: '500',
        color: 'slate.400',
    }
})

const input_box = cva({
    base: {
        '& span': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '36px',
            border: '1px solid #ccc',
            backgroundColor: '#e6f3ff',
            color: 'slate.400',
            fontSize: '13px',
            fontWeight: '700',
            fontFamily: 'plusJakartaSans_regular'
        },
        '& input': {
            height: '36px',
            border: '1px solid #ccc',
            paddingLeft: '15px',
            fontSize: '14px',
            fontWeight: '700',
            '& :focus': {
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(0,123,255,.25)',
            }
        }
    },
    variants: {
        visual: {
            currency: {
                '& #symbol': {
                    borderRadius: '4px 0 0 4px',
                    borderRight: 'none',
                },
                '& #mortgage_amount': {
                    borderRadius: '0 4px 4px 0',
                    borderLeft: 'none',
                }
            },
            years: {
                '& #tag': {
                    borderRadius: '0 4px 4px 0',
                    borderLeft: 'none',
                },
                '& #mortgage_term': {
                    borderRadius: '4px 0 0 4px',
                    borderRight: 'none',
                }
            },
            rate: {
                '& #symbol': {
                    borderRadius: '0 4px 4px 0',
                    borderLeft: 'none',
                },
                '& #interest_rate': {
                    borderRadius: '4px 0 0 4px',
                    borderRight: 'none',
                }
            }
        }
    }
});

const input_radio_box = cva({
    base: {
        display: 'flex',
        height: '36px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        paddingLeft: '10px',
        alignItems: 'center',
        color: 'slate.700',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: 'plusJakartaSans_regular'
    }
});


const submit_button = cva({
    base: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'hsl(61, 70%, 52%)',
        height: { xsm: '36px' },
        borderRadius: '200px 200px 200px 200px',
        color: 'slate.700',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: { xsm: '0px', lg: '20px' },
    }
});

const clear_button = cva({
    base: {
        color: "slate.500",
        fontSize: "14px",
        textDecoration: "underline",
        cursor: "pointer",
    }
});

export const CalculatorCard= () => {

    interface FormState {
        mortgage_amount: number,
        mortgage_term: number,
        interest_rate: number,
        type: number
    }

    const formInitialState: FormState = {
        mortgage_amount: 0,
        mortgage_term: 0,
        interest_rate: 0,
        type: 0
    }

    const [formState, setFormState] = useState( formInitialState );
    const [isSubmited, setIsSubmited] = useState(false);


    const onInputChange = ( {target}: React.ChangeEvent<HTMLInputElement> ) => {
        const {name, value} = target;

        //? Bajo observacion, porque cuando se escribe de forma erronea un input y se borra
        //? el valor, el value se convierte en un string vacio, lo cual no es valido para el
        //? calculo de los resultados, por lo que se debe validar que el valor sea un numero
        // console.log(name, value);

        //TODO validacion de inputs
        if ( name === 'type' && value === '1' ) {
            document.getElementById('repayment')!.style.accentColor = '#ff5500'
            document.getElementById('repayment_box')!.style.backgroundColor = 'hsla(61, 70%, 52%, 0.4)';
            document.getElementById('interest_only_box')!.style.backgroundColor = 'white';
        }else if ( name === 'type' && value === '2' ) {
            document.getElementById('interest_only')!.style.accentColor = '#ff5500'
            document.getElementById('interest_only_box')!.style.backgroundColor = 'hsla(61, 70%, 52%, 0.4)';
            document.getElementById('repayment_box')!.style.backgroundColor = 'white';
        }

        setFormState({
            ...formState,
            [name]: value
        });
        setIsSubmited(false);
    }

    const onResetForm = () => {
        setFormState( formInitialState );
        setIsSubmited(false);
        document.getElementById('repayment_box')!.style.backgroundColor = 'white';
        document.getElementById('interest_only_box')!.style.backgroundColor = 'white';
    };

    
    const onHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newForm = { 
            ...formState
        };

        setFormState(newForm);
        setIsSubmited(true);
    }


    return (
        <>
            <div className={ css({ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }) }>
                <div 
                    id="calculator_card_box"
                    className={ 
                        cx( 
                            flex({ direction: { xsm: 'column', lg: 'row' } }), 
                            css({ 
                                display: 'flex', 
                                height: { xsm: '100%', lg: '65%' }, 
                                width: { xsm: '100%', lg: '50%' }, 
                                backgroundColor: 'white',
                                borderRadius: '20px',
                            }) 
                        ) 
                    }
                >

                    <div id="calculator_card" className={ cx( container({}), calculator_card({}) ) }>
                        <form id="form_calculation" onSubmit={ onHandleSubmit }>
                        
                            <div id="title_calculator" className={ css({ paddingTop: '20px' }) }>Mortage Calculator</div>
                            <button id="button_resetFields" type="reset" onClick={onResetForm} className={ clear_button({}) }>
                                Clear All
                            </button>

                            <div className={ grid({ columns: { xsm: 4 } }) }>
                                
                                <div id="input_amount_wrapper" className={ cx( flex({ direction: { xsm: 'column' } }), gridItem({ colSpan: { xsm: 4 } }), css({ paddingTop: '20px' }) ) }>
                                    <label htmlFor="mortgage_amount" className={ label({}) }>Mortgage Amount</label>
                                    <div id="input_box" className={ cx( input_box({ visual: 'currency' }), grid({ columns: { xsm: 12 }, gap: { xsm: 0 } })) }>
                                        <span id="symbol" className={ gridItem({ colSpan: { xsm: 2, lg: 1 } }) }>£</span>
                                        <input id="mortgage_amount" type="number" name="mortgage_amount" className={ gridItem({ colSpan: { xsm: 10, lg: 11 } }) } onChange={ onInputChange } autoComplete="off" required />
                                    </div>
                                </div>
                                
                                <div id="input_term_wrapper" className={ cx( flex({ direction: { xsm: 'column' } }), gridItem({ colSpan: { xsm: 4, lg: 2 } }) ) }>
                                    <label htmlFor="mortgage_term" className={ label({}) }>Mortgage Term</label>
                                    <div id="input_box" className={ cx( input_box({ visual: 'years' }), grid({ columns: { xsm: 12 }, gap: { xsm: 0 } })) }>
                                        <input id="mortgage_term" type="number" name="mortgage_term" className={ gridItem({ colSpan: { xsm: 10, lg: 8 } }) } onChange={ onInputChange } autoComplete="off" required />
                                        <span id="tag" className={ gridItem({ colSpan: { xsm: 2, lg: 4 } }) }>years</span>
                                    </div>
                                </div>
                                
                                <div id="input_rate_wrapper" className={ cx( flex({ direction: { xsm: 'column' } }), gridItem({ colSpan: { xsm: 4, lg: 2 } }) ) }>
                                    <label htmlFor="interest_rate" className={ label({}) }>Interest Rate</label>
                                    <div id="input_box" className={ cx( input_box({ visual: 'rate' }), grid({ columns: { xsm: 12 }, gap: { xsm: 0 } })) }>
                                        {/*
                                            Firefox tiene un bug que permite en sus input introducir caracteres no numericos
                                            para remediar esto podemos usar un tag parecido a este
                                            <input type="text" inputmode="numeric" pattern="\d*" />
                                        */}
                                        <input id="interest_rate" type="number" step="0.01" name="interest_rate" className={ gridItem({ colSpan: { xsm: 10 } }) }  onChange={ onInputChange } autoComplete="off" required />
                                        <span id="symbol" className={ gridItem({ colSpan: { xsm: 2 } }) }>%</span>
                                    </div>
                                </div>

                                <div id="input_type_wrapper" className={ cx( flex({ direction: { xsm: 'column' } }), gridItem({ colSpan: { xsm: 4 } }) ) }>
                                    <label id="mortgage_type" htmlFor="type" className={ label({}) }>Mortgage Type</label>
                                    <div id="mortgage_type">
                                        <div id="repayment_box" className={ cx( input_radio_box({}), grid({ columns: 12 }) ) }>
                                            <input id="repayment" value="1" type="radio" name="type" onChange={ onInputChange } className={ gridItem({ colSpan: { xsm: 1 } }) } required/>
                                            <label htmlFor="repayment" className={ gridItem({ colSpan: { xsm: 11 } }) }>Repayment</label>
                                        </div>
                                        <div id="interest_only_box" className={ cx( input_radio_box({}), grid({ columns: 12 }), css({ marginTop: '7px' }) ) }>
                                            <input id="interest_only" value="2" type="radio" name="type" onChange={ onInputChange } className={ gridItem({ colSpan: { xsm: 1 } }) } required/>
                                            <label htmlFor="interest_only" className={ gridItem({ colSpan: { xsm: 11 } }) }>Interest Only</label>
                                        </div>
                                    </div>
                                </div>

                                <div className={ cx( flex({ direction: { xsm: 'column' } }), gridItem({ colSpan: { xsm: 4, lg: 3 } }) ) }>
                                    <button type="submit" className={ cx( submit_button({}) ) }>
                                        <img src="/07-FEM_mortgage-repayment-calculator/assets/images/icon-calculator.svg" alt="calc" />
                                        <span>&nbsp;Calculate Repayments</span>
                                    </button>
                                </div>

                            </div>

                        </form>
                    </div>


                    <div className={ cx( grid({ columns: 12 }) ) }>
                        <div className={ gridItem({ colSpan: { xsm: 12, lg: 12 } }) }>
                            <ResultsSection isSubmited={ isSubmited } formState={ formState } />
                        </div>
                    </div>

                </div>
            </div>
        </>

  )
}


