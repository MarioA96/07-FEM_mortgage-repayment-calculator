import { DisplayedResults } from "./DisplayedResults"
import { NoDisplayedResults } from "./NoDisplayedResults"

type FormState = {
    mortgage_amount: number,
    mortgage_term: number,
    interest_rate: number,
    type: number
}

export const ResultsSection = ( {isSubmited, formState}: { isSubmited: boolean, formState: FormState } ) => {
    return (
        <>
            {
                isSubmited
                    ? <DisplayedResults formState={formState} />
                    : <NoDisplayedResults />
            }
            
        </>
    )
}
