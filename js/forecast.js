const key = "a57f707af81b1d074f20dca7665de005";

const getForecast = async city => {
    const base = "https://api.openweathermap.org/data/2.5/forecast";
    const query = `?q=${city}&units=metric&appid=${key}`; // & is used as a , for parameter seperation after ?

    const url = base + query;
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        await Promise.reject(new Error('Status Code: ' + res.status));
    }
}

//getForecast('mumbai')
//.then(data => console.log(data))
//.catch(err => console.warn(err));
