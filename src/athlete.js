class Athlete {
    constructor(athlete) {
        this.id = athlete.id;
        this.name = athlete.attributes.name;
        Athlete.all.push(this);
    }

    renderAthlete() {
        const div = document.getElementById('athleteName');
        div.innerHTML = `<h1>${this.name}</h1>`;
    }
}

Athlete.all = [];

async function registerAthlete() {
    displayAthleteDivs();
    const name = document.getElementById('register').value;
    const resp = await fetch(athleteEndPoint, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name
        })
    });
    const json = await resp.json();
    new Athlete(json.data).renderAthlete();
}

function displayAthleteDivs() {
    document.getElementById('athleteLogin').classList.add('d-none');
    document.getElementById('athleteName').classList.remove('d-none');
    document.getElementById('athleteWorkout').classList.remove('d-none');
}
