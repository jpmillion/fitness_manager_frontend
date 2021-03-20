class Athlete {
    constructor(athlete) {
        this.id = athlete.id;
        this.name = athlete.attributes.name;
        Athlete.all.push(this);
    }

    renderAthlete() {
        const div = document.getElementById('athleteName');
        div.innerHTML = `<h1>${this.name}</h1>`;
        return this
    }

    displayAthleteDivs() {
        document.getElementById('athleteLogin').classList.add('d-none');
        document.getElementById('athleteName').classList.remove('d-none');
        document.getElementById('athleteWorkout').classList.remove('d-none');
    }

}

Athlete.all = [];

function registerAthlete() {
    const name = document.getElementById('register').value;
    if (!name) return window.alert('Username Required');
    return fetch(athleteEndPoint, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
           })
            .then(resp => resp.json())
            .then(json => athleteCreation(json))
            .catch(error => window.alert(error)) 
}

