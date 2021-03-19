const workoutEndPoint = "http://localhost:3000/api/v1/workouts";
const exerciseEndPoint = "http://localhost:3000/api/v1/exercises";
const athleteEndPoint = "http://localhost:3000/api/v1/athletes"

fetch(exerciseEndPoint)
    .then(resp => resp.json())
    .then(json => getExercisesAndRelationships(json))
    .catch(error => window.alert(error))

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