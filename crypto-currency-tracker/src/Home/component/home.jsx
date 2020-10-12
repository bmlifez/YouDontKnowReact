import React, { useState, useEffect } from 'react';
import fetch_Data from '../../API/home';

const home = (props) => {
    const [info, setInfo] = useState({});
    useEffect(() => {
        let URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
        fetch_Data(URL);
    });
    return (<React.Fragment>
        Hello
    </React.Fragment>  );
}
export default home;