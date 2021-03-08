const workoutEndPoint = "http://localhost:3000/api/v1/workouts";

getWorkouts();

function getWorkouts() {
    fetch(workoutEndPoint)
    .then(resp => resp.json())
    .then(workouts => {
        const body = document.querySelector('body');
        workouts.data.forEach(workout => {
            const div = document.createElement('div');
            div.innerText = workout.attributes.name;
            body.appendChild(div);
        });
    });
}
