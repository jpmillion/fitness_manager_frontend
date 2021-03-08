const workoutEndPoint = "http://localhost:3000/api/v1/workouts";

getWorkouts();

function getWorkouts() {
    fetch(workoutEndPoint)
    .then(resp => resp.json())
    .then(workouts => {
        const body = document.querySelector('body');
        const div = document.createElement('div');
        const ol = document.createElement('ol');
        workouts.data.forEach(workout => {
            div.innerText = workout.attributes.name;
            body.appendChild(div);
        });
        workouts.included.forEach(exercise => {
            const li = document.createElement('li');
            li.innerText = exercise.attributes.name;
            ol.appendChild(li);
            div.appendChild(ol);
        });
    });
}
