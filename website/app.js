// Constants for the API key and base URL
const apiKey = '575491410be84a0717b1c46ef9b5f1e6&units=imperial';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';

// Generate the current date in MM.DD.YYYY format
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Function to fetch weather data from the OpenWeatherMap API
const getWeatherData = async (zip) => {
    try {
        const response = await fetch(`${baseURL}?zip=${zip}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// Function to send data to the server
const postData = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.error("Error posting data:", error);
    }
};

// Function to get project data from the server and update the UI
const retrieveData = async () => {
    try {
        const request = await fetch('/all');
        const allData = await request.json();
        document.getElementById('temp').innerHTML = `${Math.round(allData.temperature)} degrees`;
        document.getElementById('content').innerHTML = allData.userResponse;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.error("Error retrieving data:", error);
    }
};

// Add event listener to the "Generate" button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeatherData(newZip)
        .then(data => {
            if (data && data.main) {
                return postData('/add', {
                    temperature: data.main.temp,
                    date: newDate,
                    userResponse: feelings
                });
            } else {
                throw new Error('Weather data not found');
            }
        })
        .then(() => retrieveData())
        .catch(error => {
            console.error("Error:", error);
            clearUI();
        });
}

// Function to clear the UI
function clearUI() {
    document.getElementById('temp').innerHTML = '';
    document.getElementById('content').innerHTML = '';
    document.getElementById('date').innerHTML = '';
}
