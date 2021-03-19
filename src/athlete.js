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
