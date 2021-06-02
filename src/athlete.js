class Athlete {
    constructor(athlete) {
        this.id = athlete.id;
        this.name = athlete.attributes.name;
        Athlete.all.push(this);
    }

    renderAthlete() {
        const div = document.getElementById('athleteName');
        div.innerHTML = `<h1>${this.name}</h1><br><button class="btn-dark text-light">LogOut</button>`;
        const button = document.getElementById('athleteName').querySelector('button');
        button.addEventListener('click', this.logout);
        return this
    }

    logout = () => {
        sessionStorage.clear();
        toggleDisplay();
        document.getElementById('workouts').replaceChildren('');
    }

    static creation(json) {
        if (json.errors) {
            window.alert(json.errors);
        } else {
            sessionStorage.setItem('token', json.token);
            new Athlete(json.athlete.data).renderAthlete();
            toggleDisplay();
            if (json.athlete.included) athleteWorkouts(json.athlete.included);
        }
    }

    static async register() {
        const name = document.getElementById('register').value;
        const password = document.getElementById('regPass').value;
        document.getElementById('register').value = '';
        document.getElementById('regPass').value = '';
        if (!name) return window.alert('Username Required');
        try {
            const resp = await fetch(athleteEndPoint, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    athlete: {
                        name,
                        password
                    }
                })
               });
            const json =  await resp.json();
            Athlete.creation(json);
            document.getElementById('workouts').innerHTML = '<h2>You Have No Workout To View</h2>';
        } catch (error) {
            window.alert(error)
        }
    }

    static async login() {
        const name = document.getElementById('login').value;
        const password = document.getElementById('logPass').value;
        document.getElementById('login').value = '';
        document.getElementById('logPass').value = '';
        try {
            const resp = await fetch(sessionsEndPoint, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    password
                })
            });
            const json = await resp.json();
            console.log(json)
            Athlete.creation(json);
        } catch(error) {
            window.alert(error)
        }
    }

}

Athlete.all = [];



