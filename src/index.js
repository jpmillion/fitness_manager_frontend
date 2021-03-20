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
        if (el.type === 'category') new Category(el).renderCategory();
    })
    json.data.forEach(exercise => {
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

function getAthleteAndWorkout() {
    const id = document.getElementById('login').value;
    if (!id) return window.alert('Username Required');
    return fetch(`${athleteEndPoint}/${id}`)
            .then(resp => resp.json())
            .then(json => {
                if (json.errors) {
                    window.alert(json.errors);
                } else {
                    new Athlete(json.data).renderAthlete().displayAthleteDivs();
                    json.included.forEach(athleteWorkout => {
                        new Workout(athleteWorkout).renderWorkout();
                        const exercises = Exercise.all.filter(ex => ex.workout).filter(ex => ex.workout.id === athleteWorkout.id);
                        exercises.forEach(ex => ex.renderExercise4Workout());
                    })
                }
            })
            .catch(error => window.alert(error))
}

