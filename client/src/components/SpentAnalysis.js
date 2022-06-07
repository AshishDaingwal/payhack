import React, {useContext, useEffect, useState} from "react";
import { GlobalContext } from "./context/GlobalState";
import styles from "../styles/TransactionList/TransactionList.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
    // Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    // Tooltip,
    // Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Your Year in Review',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const dataBar = {
    labels,
    datasets: [
        {
            label: 'Spent Amount',
            data: [25000,35000,45000,20000,15000,6000,50000],
            backgroundColor: 'rgba(248,191,25,0.8)',
        },
        {
            label: 'Cashback',
            data: [5500,6300,7000,4000,3000,800,9000],
            backgroundColor: 'rgba(101,234,86,0.7)',
        },
    ],
};

ChartJS.register(ArcElement, Tooltip, Legend);
const SpentAnalysis = (props) => {
    const { spentAnalysis } = useContext(GlobalContext);
    const [dataPoints, setDataPoint] = useState();
    const [dataCashback, setCashback] = useState();
    const [dataLabel, setDataLabel] = useState();
    const [totalSpending, setTotalSpending] = useState(0);
    const [totalSaving, setTotalSaving] = useState(0);
    const [showSavings, setShowSavings] = useState(false);
    const [showYearly, setYearly] = useState(false);
    const [showMonthly, setMonthly] = useState(false);
    console.log(dataPoints);
    useEffect(()=>{
        let sample = [];
        let label = [];
        let cashback = [];
        spentAnalysis.map((spent)=>{
            sample = [...sample, spent.totalSpent];
            label = [...label, spent._id];
            cashback = [...cashback, spent.totalCashBack];
        })
        setTotalSpending(sample.reduce((a, b) => a + b, 0))
        setTotalSaving(cashback.reduce((a, b) => a + b, 0))
        setDataPoint(sample);
        setCashback(cashback)
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
    let data3 = {
        labels: dataLabel,
        datasets: [
            {
                label: 'Categories',
                data: [19844,2300,450,4499,17500,9819],
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
    let data2 = {
        labels: dataLabel,
        datasets: [
            {
                label: 'Categories',
                data: dataCashback,
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
        <div style={{marginTop:"-40px"}}>
            <div style={{"width": "25rem", "margin": "auto", textAlign:"center"}}>
                <button onClick={()=>{setYearly(false); setMonthly(false)}} style={{padding: "2px 5px", margin:"0px 1px"}}>Last Week</button>
                <button onClick={()=>{setYearly(false); setMonthly(true)}}  style={{padding: "2px 5px", margin:"0px 1px"}}>Last Month</button>
                <button onClick={()=>{setYearly(true)}} style={{padding: "2px 5px", margin:"0px 1px"}}>Last Year</button>
            </div>
            {showYearly && <div style={{"width":"50rem","margin":"auto", marginBottom:"30px"}}>
                <Bar options={options} data={dataBar} />
            </div>}
            {!showYearly && !showMonthly && <div style={{"width":"25rem","margin":"auto"}}>
                <Doughnut data={data}/>
                <h3 style={{"padding":"15px 0px 0px 0px","textAlign":"center"}}>Total Spending: &#8377; {totalSpending}</h3>
                <h3 style={{"padding":"15px 0px","textAlign":"center"}} onClick={()=>{setShowSavings(!showSavings)}}>Total Savings: &#8377; {totalSaving}</h3>
            </div>}
            {!showYearly && showMonthly && <div style={{"width":"25rem","margin":"auto"}}>
                <Doughnut data={data3}/>
                <h3 style={{"padding":"15px 0px 0px 0px","textAlign":"center"}}>Total Spending: &#8377; 54412</h3>
                <h3 style={{"padding":"15px 0px","textAlign":"center"}} onClick={()=>{setShowSavings(!showSavings)}}>Total Savings: &#8377; 2115</h3>
            </div>}
            {showSavings && !showYearly && <div style={{"width":"25rem","margin":"auto", marginBottom:"30px"}}>
                <Doughnut data={data2}/>
            </div>}

        {/*<table className={styles["content-table"]}>*/}
        {/*    <thead>*/}
        {/*        <tr>*/}
        {/*            <th >Category</th>*/}
        {/*            <th >Amount</th>*/}
        {/*            <th >CashBack</th>*/}
        {/*        </tr>*/}
        {/*    </thead>*/}
        {/*    {spentAnalysis.length > 0 && (*/}
        {/*        <tbody>*/}
        {/*            {spentAnalysis.map((spent) => {*/}
        {/*                return (*/}
        {/*                    <tr key={spent._id}>*/}
        {/*                        <td>{spent._id}</td>*/}
        {/*                        <td>{spent.totalSpent}</td>*/}
        {/*                        <td>{spent.totalCashBack}</td>*/}
        {/*                    </tr>*/}
        {/*                );*/}
        {/*            })}*/}
        {/*        </tbody>*/}
        {/*    )}*/}
        {/*</table>*/}
        </div>
    );
};

export default SpentAnalysis;
