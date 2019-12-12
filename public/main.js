const form = document.getElementById('vote-form');

//Form submit event
form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=survey]:checked').value;
    const choice = document.queryCommandValue('input[name=q1]:checked').value;
    const choice = document.querySelector('input[name=q2]:checked').value;
    const choice = document.querySelector('input[name=q3]:checked').value;
    const choice = document.querySelector('input[name=q4]:checked').value;
    const data = { survey: choice };
    const data = { q1: choice };
    const data = { q2: choice };
    const data = { q3: choice };
    const data = { q4: choice };
    
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

fetch('http://localhost:3000/poll')
    .then(res => res.json())
    .then(data => {
        const votes = data.votes;
        const totalVotes = votes.length;
        //Counting the votes     acc=accumilator   votes=current
        const voteCounts = votes.reduce((acc, vote) => ((acc[vote.survey] = (acc[vote.survey] || 0) + parseInt(vote.points)), acc), {});

        let dataPoints = [
            { label: 'Male', y: voteCounts.Male },
            { label: 'Female', y: voteCounts.Female },
        ];

    const chartContainer = document.querySelector('#chartContainer');

    if (chartContainer) {
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
        channel.bind('survey-vote', function (data) {
            dataPoints = dataPoints.map(x => {
                if (x.label == data.survey) {
                    x.y += data.points;
                    return x;
                } else {
                    return x;
                }
            });
            chart.render();
        });
    }

});
