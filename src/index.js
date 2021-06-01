const workoutEndPoint = "http://localhost:3005/api/v1/workouts";
const exerciseEndPoint = "http://localhost:3005/api/v1/exercises"; //"https://glacial-mesa-45104.herokuapp.com/api/v1/exercises";
const athleteEndPoint = "http://localhost:3005/api/v1/athletes";
const sessionsEndPoint = "http://localhost:3005/api/v1/sessions";

sessionStorage.clear();
fetchExercisesAndCategories();
listen4Login();
listen4Register();
Workout.createWorkoutFormElements();
Workout.toggleWorkoutForm();

async function fetchExercisesAndCategories() {
    try {
        const resp = await fetch(exerciseEndPoint);
        const json = await resp.json();
        getExercisesAndRelationships(json);
    } catch (error) {
        window.alert(error)
    }
}

function getExercisesAndRelationships(json) {
    json.included.forEach(el => {
        if (el.type === 'category') new Category(el).renderCategory();
    })
    json.data.forEach(exercise => {
        new Exercise(exercise).renderExercise4Category();
    })
}

function listen4Login() {
    const button = document.getElementById('loginButton');
    button.addEventListener('click', Athlete.login);
}

function listen4Register() {
    const button = document.getElementById('registerButton');
    button.addEventListener('click', Athlete.register);
}

function athleteWorkouts(workouts) {
    if (workouts.length) {
        workouts.forEach(athleteWorkout => {
            new Workout(athleteWorkout).renderWorkout();
            const exercises = Exercise.all.filter(ex => ex.workout).filter(ex => ex.workout.id === athleteWorkout.id);
            exercises.forEach(ex => ex.renderExercise4Workout());
        })
    } else {
        document.getElementById('workouts').innerHTML = '<h2>You Have No Workout To View</h2>'
    }
}

async function authentication() {
    if (sessionStorage.token) {
        const token = { sessionStorage }
        try {
            const resp = await fetch(`${athleteEndPoint}/authenticate`, { headers: { token } });
            const json = await resp.json();
            Athlete.creation(json);
        } catch (e) {
            window.alert(e);
        }
    }
}

function toggleDisplay() {
    if (sessionStorage.token) {
        document.getElementById('athleteLogin').classList.add('d-none');
        document.getElementById('athleteName').classList.remove('d-none');
        document.getElementById('athleteWorkout').classList.remove('d-none');
    } else {
        document.getElementById('athleteLogin').classList.remove('d-none');
        document.getElementById('athleteName').classList.add('d-none');
        document.getElementById('athleteWorkout').classList.add('d-none');
    }
}
