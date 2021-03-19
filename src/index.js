const workoutEndPoint = "http://localhost:3000/api/v1/workouts";
const exerciseEndPoint = "http://localhost:3000/api/v1/exercises";
const athleteEndPoint = "http://localhost:3000/api/v1/athletes"

fetch(exerciseEndPoint)
    .then(resp => resp.json())
    .then(json => getExercisesAndRelationships(json))
    .catch(error => window.alert(error))

listen4Login();
listen4Register();
Workout.createWorkoutFormElements();
Workout.toggleWorkoutForm();

function getExercisesAndRelationships(json) {
    json.included.forEach(el => {
        //el.type === 'category' ? new Category(el).renderCategory() : new Workout(el).renderWorkout();
        if (el.type === 'category') new Category(el).renderCategory();
    })
    json.data.forEach(exercise => {
        //new Exercise(exercise).renderExercise();
        new Exercise(exercise).renderExercise4Category();
    })
}

function listen4Login() {
    const button = document.getElementById('loginButton');
    button.addEventListener('click', getAthleteAndWorkout);
}

function listen4Register() {
    const button = document.getElementById('registerButton');
    button.addEventListener('click', registerAthlete);
}

async function getAthleteAndWorkout() {
    displayAthleteDivs();
    const id = document.getElementById('login').value;
    const resp = await fetch(`${athleteEndPoint}/${id}`);
    const json = await resp.json();
    new Athlete(json.data).renderAthlete();
    json.included.forEach(athleteWorkout => {
        new Workout(athleteWorkout).renderWorkout();
        const exercises = Exercise.all.filter(ex => ex.workout).filter(ex => ex.workout.id === athleteWorkout.id);
        exercises.forEach(ex => ex.renderExercise4Workout());
    })
}

