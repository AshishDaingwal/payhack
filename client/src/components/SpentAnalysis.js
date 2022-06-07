import React, {useContext, useEffect, useState} from "react";
import { GlobalContext } from "./context/GlobalState";
import styles from "../styles/TransactionList/TransactionList.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const SpentAnalysis = (props) => {
    const { spentAnalysis } = useContext(GlobalContext);
    const [dataPoints, setDataPoint] = useState();
    const [dataLabel, setDataLabel] = useState();
    const [totalSpending, setTotalSpending] = useState(0);
    const [totalSaving, setTotalSaving] = useState(0);
    console.log(dataPoints);
    useEffect(()=>{
        let sample = [];
        let label = [];
        spentAnalysis.map((spent)=>{
            sample = [...sample, spent.totalSpent];
            label = [...label, spent._id];
        })
        setTotalSpending(sample.reduce((a, b) => a + b, 0))
        setDataPoint(sample);
        setDataLabel(label)
    },[spentAnalysis])
    let data = {
        labels: dataLabel,
        datasets: [
            {
                label: 'Categories',
                data: dataPoints,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div>
            <div>

            </div>
            <div style={{"width":"25rem","margin":"auto"}}>
                <Doughnut data={data}/>
                <h3 style={{"padding":"15px 0px 0px 0px","textAlign":"center"}}>Total Spending: &#8377; {totalSpending}</h3>
                <h3 style={{"padding":"15px 0px","textAlign":"center"}}>Total Savings: &#8377; {totalSaving}</h3>
            </div>
        <table className={styles["content-table"]}>
            <thead>
                <tr>
                    <th >Category</th>
                    <th >Amount</th>
                    <th >CashBack</th>
                </tr>
            </thead>
            {spentAnalysis.length > 0 && (
                <tbody>
                    {spentAnalysis.map((spent) => {
                        return (
                            <tr key={spent._id}>
                                <td>{spent._id}</td>
                                <td>{spent.totalSpent}</td>
                                <td>{spent.totalCashBack}</td>
                            </tr>
                        );
                    })}
                </tbody>
            )}
        </table>
        </div>
    );
};

export default SpentAnalysis;
