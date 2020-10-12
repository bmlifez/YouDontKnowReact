const fetch_Data = async (url,data,method,headers) =>{
    let params = {};
    switch (method) {
        case 'GET':
            params = {
                method: 'GET'
            }
        break;
        case 'POST': 
            params = {
                method: 'post',
                body: JSON.stringify(data)
            }
    }
    console.log(params);
    let response = await fetch(url);
    return response.json();
}

export const fetch_Data; 