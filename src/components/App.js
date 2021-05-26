import React, {useState} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './App.css';
import EnhancedTable from  '../components/Table';

import axios from "axios";

function App() {
    const [data, setData] = useState([]);

    axios.get('https://gist.githubusercontent.com/ryanjn/07512cb1c008a5ec754aea6cbbf4afab/raw/eabb4d324270cf0d3d17a79ffb00ff3cfaf9acc3/orders.json')
        .then((res) => setData(res.data));

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="App">
            <head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            </head>
            <div className="title">Orders</div>
            <div className="table-tabs">
                <Tabs
                    value={value}
                    TabIndicatorProps={{style: {background:'black'}}}
                    textColor="black"
                    onChange={handleChange}
                    aria-label="tabs"
                >
                    <Tab label="All"/>
                    <Tab label="Shipped"/>
                </Tabs>
                <div className="total">Total orders: <strong>$900.00</strong> USD</div>
            </div>
            <div className="table">
                {!value ? <EnhancedTable data={data}/> : <EnhancedTable data={data.filter((el) =>el.status === 'shipped')}/>}
            </div>
        </div>
    );
}

export default App;
