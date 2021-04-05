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

    static creation(json) {
        if (json.errors) {
            window.alert(json.errors);
        } else {
            new Athlete(json.data).renderAthlete().displayAthleteDivs();
            if (json.included) athleteWorkouts(json.included);
        }
    }

    static async register() {
        const name = document.getElementById('register').value;
        if (!name) return window.alert('Username Required');
        try {
            const resp = await fetch(athleteEndPoint, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: name
                })
               });
            const json =  await resp.json();
            Athlete.creation(json);
        } catch (error) {
            window.alert(error)
        }
    }

}

Athlete.all = [];

 


