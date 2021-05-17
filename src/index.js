const workoutEndPoint = "https://glacial-mesa-45104.herokuapp.com/api/v1/workouts";
const exerciseEndPoint = "https://glacial-mesa-45104.herokuapp.com/api/v1/exercises";
const athleteEndPoint = "https://glacial-mesa-45104.herokuapp.com/api/v1/athletes";

fetchExercisesAndCategories();
listen4Login();
listen4Register();
toggleBackgroundColor();
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
    button.addEventListener('click', getAthleteAndWorkout);
}

function listen4Register() {
    const button = document.getElementById('registerButton');
    button.addEventListener('click', Athlete.register);
}

async function getAthleteAndWorkout() {
    const id = document.getElementById('login').value;
    if (!id) return window.alert('Username Required');
    try {
        const resp = await fetch(`${athleteEndPoint}/${id}`);
        const json = await resp.json();
        Athlete.creation(json);
    } catch(error) {
        window.alert(error)
    }
}

function athleteWorkouts(workouts) {
    workouts.forEach(athleteWorkout => {
        new Workout(athleteWorkout).renderWorkout();
        const exercises = Exercise.all.filter(ex => ex.workout).filter(ex => ex.workout.id === athleteWorkout.id);
        exercises.forEach(ex => ex.renderExercise4Workout());
    })
}

function toggleBackgroundColor() {
    const body = document.querySelector('body');
    const div = document.getElementById('athleteLogin');
    const button = document.createElement('button');
    button.innerText = 'Toggle Dark Mode';
    button.addEventListener('click', () => {
        if (body.classList.length === 2) {
            body.classList.remove('bg-dark');
            console.log(body);
        } else {
            body.classList.add('bg-dark');
        } 
    });
    div.appendChild(button);
}

