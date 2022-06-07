import Heading from '../components/Heading';
import React from 'react'
import SpentAnalysis from "./SpentAnalysis";
import DateRange from "./DateRange";

const Home = (props) => {
    return(
        <React.Fragment>

            <SpentAnalysis
                sdate={props.sdate}
                edate={props.edate}
            >

            </SpentAnalysis>
            {/*<Heading>*/}

            {/*</Heading>*/}
            {/*<TransactionList>*/}
            {/*</TransactionList>*/}
        </React.Fragment>
    )
}

export default Home;