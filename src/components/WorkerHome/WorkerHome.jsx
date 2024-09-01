import './WorkerHome.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../../state/userSlice'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React, { useState, useEffect, startTransition } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



const WorkerHome = () => {

    const user = useSelector(selectUser)
    const [tableContent, setTableContent] = useState('All');
    const [tableData, settableData] = useState([]);
    const [ratingData, setRatingData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [rerender, setRerender] = useState(false);
    const [chartDate, setChartDate] = useState(true);
    const [summary, setSummary] = useState({});


    //----------------------UPDATING STATUS-----------------------
    const updateStatus = async (status, BookId) => {
        await updateData(status, BookId);
        setRerender(!rerender)
    }

    // ------------------------CHART DATA SETTINGS-------------------
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    const [chartOptions, setChartOptions] = useState({});


    const [chartRatingData, setRatingChartData] = useState({
        datasets: [],
    });

    const [chartRatingOptions, setRatingChartOptions] = useState({});


    const setCharts = async (days) => {
        let rat = [];
        let ord = [];

        await getOrderChartData(days);
        await getRatingChartData(days);

        rat = ratingData;
        ord = orderData;

        const labels = [];
        const today = new Date();

        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            labels.push(date.toISOString().slice(0, 10).split('-').reverse().join('/'));
        }

        setChartData({
            labels: orderData.map((op) => { op.BookDate = op.BookDate.split('T')[0]; return op.BookDate }),
            datasets: [
                {
                    label: "Orders",
                    data: orderData.map((op) => op.orders),
                    borderColor: "#3639ff",
                    backgroundColor: "rgba(245, 5, 69)",
                }
            ],
        });

        setChartOptions({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Orders History',
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 100
                            }
                        }
                    ]
                }
            },
        });

        setRatingChartData({
            labels: labels,
            datasets: [
                {
                    label: "Rating",
                    data: ratingData.map((op) => op.Rating),
                    borderColor: "rgb(0, 186, 3)",
                    backgroundColor: "rgba(18, 0, 200, 0.2)",
                }
            ],
        });

        setRatingChartOptions({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Ratings History',
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 100
                            }
                        }
                    ]
                }
            },
        });

    }

    // ---------------------GETTING DATA----------------------
    const getSummary = async () => {
        const Data = await fetch('http://localhost:5000/getSummary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: user
            })
        })
            .then(res => res.json())
            .then(async (Data) => {
                setSummary(Data[0])
            })
    };

    const updateData = async (_status, id) => {
        const Data = await fetch('http://localhost:5000/updatebooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                status: _status,
                bookid: id,
                user: user,
                condition: tableContent
            })
        })
            .then(res => res.json())
            .then(async (Data) => {
                await Data.map((cust) => {
                    cust.CustCity = `${cust.CustHNo}, ${cust.CustStreet}, ${cust.CustCity}`;
                    cust.BookDate = cust.BookDate.split('T')[0];
                    cust.BookTime = cust.BookTime.split('T')[1];
                    cust.BookTime = cust.BookTime.split('.')[0];
                    cust.EndTime = cust.EndTime.split('T')[1];
                    cust.EndTime = cust.EndTime.split('.')[0];
                })
                settableData(Data);
            });
    }

    const getData = async () => {
        const Data = await fetch('http://localhost:5000/getBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: user
            })
        })
            .then(res => res.json())
            .then(async (Data) => {
                await Data.map((cust) => {
                    cust.CustCity = `${cust.CustHNo}, ${cust.CustStreet}, ${cust.CustCity}`;
                    cust.BookDate = cust.BookDate.split('T')[0];
                    cust.BookTime = cust.BookTime.split('T')[1];
                    cust.BookTime = cust.BookTime.split('.')[0];
                    cust.EndTime = cust.EndTime.split('T')[1];
                    cust.EndTime = cust.EndTime.split('.')[0];
                })
                settableData(Data);
            });
    }

    const getDataCondition = async (_condition) => {
        const Data = await fetch('http://localhost:5000/getBookingCondition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                condition: _condition
            })
        })
            .then(res => res.json())
            .then(async (Data) => {
                await Data.map((cust) => {
                    cust.CustCity = `${cust.CustHNo}, ${cust.CustStreet}, ${cust.CustCity}`;
                    cust.BookDate = cust.BookDate.split('T')[0];
                    cust.BookTime = cust.BookTime.split('T')[1];
                    cust.BookTime = cust.BookTime.split('.')[0];
                    cust.EndTime = cust.EndTime.split('T')[1];
                    cust.EndTime = cust.EndTime.split('.')[0];
                })
                settableData(Data);
            });
    }

    const getOrderChartData = async (_condition) => {
        const Data = await fetch('http://localhost:5000/getOrderChartData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                date: _condition
            })
        })
            .then(res => res.json())
            .then(async (Data) => {
                setOrderData(Data)
            });
    }

    const getRatingChartData = async (_condition) => {
        const Data = await fetch('http://localhost:5000/getRatingChartData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                date: _condition
            })
        })
            .then(res => res.json())
            .then(async (Data) => {

                setRatingData(Data)
            });
    }




    // -----------------------SETTING UP TABLE DATA---------------

    const setTableData = (dataType) => {
        setTableContent(dataType);
        getSummary();
        if (dataType == 'All')
            getData()
        else
            getDataCondition(dataType)
    }

    //--------------------------JSX CODE--------------------------

    const stat = (status, BookId) => {
        if (status === 'Pending')
            return (
                <>
                    <div className="acceptbtn statusbtn" onClick={async () => {
                        await updateStatus('Accepted', BookId);
                        setRerender(!rerender)
                        if (tableContent == 'All')
                            getData();
                        else
                            getDataCondition(tableContent);
                        setTableContent(tableContent)
                        settableData([...tableData])
                    }}>Accept</div>
                    <div className="rejectbtn statusbtn" onClick={async () => {
                        updateStatus('Rejected', BookId);
                        setRerender(!rerender)

                        if (tableContent == 'All')
                            getData();
                        else
                            getDataCondition(tableContent);
                        settableData([...tableData])

                    }}>Reject</div>
                </>
            )
        else if (status === 'Accepted')
            return (
                <div className="altbtn statusbtn">Accepted</div>
            )
        else if (status === 'Rejected')
            return (
                <div className="altbtn statusbtn">Rejected</div>
            )
        else if (status === 'Completed')
            return (
                <div className="altbtn statusbtn">Completed</div>
            )
    }

    const stars = () => {
        if (summary.Rating == 4)
            return '⭐⭐⭐⭐'
        else if (summary.Rating == 3)
            return '⭐⭐⭐'
        else if (summary.Rating == 2)
            return '⭐⭐'
        else if (summary.Rating == 1)
            return '⭐'
        else
            return ''
    }

    useEffect(() => {

        const setter = async () => await getData();
        setter();
        getSummary();
        setCharts(7);

    }, [rerender]);

    return (
        <div className="mainContainer">

            <div className='navbar'>
                <h1 className="logo">
                    Servicely
                </h1>
            </div>

            <div className='submainContainer'>

                <div className="summary">

                    <div className="summaryContainer">
                        <span className="valueOf">Pending Tasks</span>
                        <span className='value'>{summary.Pending}</span>
                    </div>

                    <div className="summaryContainer">
                        <span className="valueOf">Completed Tasks</span>
                        <span className='value'>{summary.Completed}</span>
                    </div>

                    <div className="summaryContainer">
                        <span className="valueOf">
                            Rating
                            {stars()}
                        </span>
                        <span className='value'>{summary.Rating}</span>
                    </div>

                    <div className="summaryContainer">
                        <span className="valueOf">Monthly Income</span>
                        <span className='value'>{summary.Price * summary.ThisMonth}</span>
                    </div>

                    <div className="summaryContainer">
                        <span className="valueOf">Total Income</span>
                        <span className='value'>{summary.Price * summary.Total}</span>
                    </div>

                </div>

                <div className="submainContainer2">

                    <div className='tableContainer'>

                        <div class="dropdown">
                            <button class="dropbtn">{tableContent}</button>
                            <div class="dropdown-content">
                                <button class="droplistbtn" onClick={() => setTableData('All')}>All</button>
                                <button class="droplistbtn" onClick={() => setTableData('Pending')}>Pending</button>
                                <button class="droplistbtn" onClick={() => setTableData('Accepted')}>Accepted</button>
                                <button class="droplistbtn" onClick={() => setTableData('Completed')}>Completed</button>
                                <button class="droplistbtn" onClick={() => setTableData('Rejected')}>Rejected</button>
                            </div>
                        </div>

                        <div className="task" id='taskHeader'>
                            <span className="date" id='dateHeader'>Date</span>
                            <span className="time" id='timeHeader'>Start Time</span>
                            <span className="time" id='timeHeader'>End Time</span>
                            <span className="customerName" id='nameHeader'>Customer Name</span>
                            <span id='addressHeader'>Address</span>
                            <span id='statusHeader'>Status</span>
                        </div>

                        <div className="table">
                            {tableData.map((cust) =>
                                <div className="task">
                                    <span className="date">{cust.BookDate}</span>
                                    <span className="time">{cust.BookTime}</span>
                                    <span className="endTime">{cust.EndTime}</span>
                                    <span className="customerName">{cust.CustFirstName}</span>
                                    <span className="address">{cust.CustCity}</span>
                                    <span className="status">
                                        {
                                            stat(cust.Status, cust.BookId)

                                        }

                                    </span>
                                </div>
                            )}
                        </div>


                    </div>

                    <div className="charts">

                        <div className="setDatebtn">
                            {
                                chartDate ?
                                    <button className='datebtn' onClick={() => { setChartDate(!chartDate); setCharts(30) }}>Last 30 Days</button>
                                    :
                                    <button className='datebtn' onClick={() => { setChartDate(!chartDate); setCharts(7) }}>Last 7 Days</button>
                            }
                        </div>

                        <div className="incomeChart chart">
                            <Line className="lineChart" options={chartRatingOptions} data={chartRatingData} />
                        </div>
                        <div className="orderChart chart">
                            <Line className="lineChart" options={chartOptions} data={chartData} />
                        </div>

                    </div>

                </div>

            </div>

        </div >
    )
}

export default WorkerHome;