fetch('http://localhost:3000/poll')
    .then(res => res.json())
    .then(data => {
        const votes = data.votes;
        const totalVotes = votes.length;
        //Counting the votes     acc=accumilator   votes=current
        const voteCounts = votes.reduce((acc, vote) => ((acc[vote.survey] = (acc[vote.survey] || 0) + parseInt(vote.points)), acc), {});
        const ratingsCounts = votes.reduce((acc, vote) => ((acc[vote.q3] = (acc[vote.q3] || 0) + parseInt(vote.points)), acc), {});
        const agesCounts = votes.reduce((acc, vote) => ((acc[vote.q4] = (acc[vote.q4] || 0) + parseInt(vote.points)), acc), {});

        let genders = [
            { label: 'Male', y: voteCounts.Male },
            { label: 'Female', y: voteCounts.Female },
        ];

        let ratings = [];
        Object.keys(ratingsCounts).forEach(x => {
            ratings.push({ label: x, y: ratingsCounts[x]});
        });

        let ages = [];
        Object.keys(agesCounts).forEach(x => {
            ages.push({ label: x, y: agesCounts[x]});
        });

    createChart('genderGraph', genders, 'survey-gender');
    createChart('rateUsGraph', ratings, 'survey-rate');
    createChart('averageAgeGraph', ages, 'survey-age');
});

let subscribeChart = function(chart, dataPoints, channelBinding) {
    var pusher = new Pusher('fdf06cf9be05339caec3', {
        cluster: 'eu',
        forceTLS: true
    });

    var channel = pusher.subscribe('survey-poll');
    channel.bind(channelBinding, function (data) {
        let isShown = dataPoints.find(x => x.label == data.data );
        if(!isShown){
            dataPoints.push({label: data.data, y: 1});
        } else {
            dataPoints = dataPoints.map(x => {
                if(x.label == data.data){
                    x.y++;
                    return x;
                } else {
                    return x;
                }
            });
        }
        chart.render();
    });
}

let createChart = function(chartId, dataPoints, channelBinding) {
    const chart = new CanvasJS.Chart(chartId, {
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
    subscribeChart(chart, dataPoints, channelBinding);
}