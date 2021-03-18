const workoutEndPoint = "http://localhost:3000/api/v1/workouts";
const exerciseEndPoint = "http://localhost:3000/api/v1/exercises";

fetch(exerciseEndPoint)
    .then(resp => resp.json())
    .then(json => getExercisesAndRelationships(json))

Workout.createWorkoutFormElements();
Workout.toggleWorkoutForm();

function getExercisesAndRelationships(json) {
    json.included.forEach(el => {
        el.type === 'category' ? new Category(el).renderCategory() : new Workout(el).renderWorkout();
    })
    json.data.forEach(exercise => {
        new Exercise(exercise).renderExercise();
    })
}