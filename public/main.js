const form = document.getElementById('vote-form');

//Form submit event
form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=survey]:checked').value;
    const data = {survey: choice};

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(err => console.log(err));

    e.preventDefault();
});

let dataPoints = [
    { label: 'Yes', y: 0 },
    { label: 'No', y: 0 },
];

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer) {
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'Survey Results'
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

    Pusher.logToConsole = true;

    var pusher = new Pusher('fdf06cf9be05339caec3', {
        cluster: 'eu',
        forceTLS: true
    });

    var channel = pusher.subscribe('survey-poll');
    channel.bind('survey-vote', function(data) {
        dataPoints = dataPoints.map(x => {
            if(x.label == data.survey) {
                x.y += data.points;
                return x;
            } else {
                return x;
            }
        });
        chart.render();
    });
}