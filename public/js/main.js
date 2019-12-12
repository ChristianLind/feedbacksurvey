const form = document.getElementById('vote-form');

//Form submit event
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let genderInput = document.querySelector('input[name=survey]:checked');
    let gender;
    if(genderInput!=null) {
        gender = genderInput.value;
    } else {
        gender = "";
    }

    const data = { 
        survey: gender,
        q1: document.getElementById('q1').value,
        q2: document.getElementById('q2').value,
        q3: document.getElementById('q3').value,
        q4: document.getElementById('q4').value,
    };
    
    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(data => console.log(data))
});

