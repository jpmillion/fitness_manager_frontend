const workoutEndPoint = "http://localhost:3000/api/v1/workouts";

getWorkouts();

function getWorkouts() {
    fetch(workoutEndPoint)
    .then(resp => resp.json())
    .then(workouts => {
        const body = document.querySelector('body');
        const div = document.createElement('div');

        workouts.data.forEach(workout => {
            const ol = document.createElement('ol');
            ol.id = workout.id;
            div.innerText = workout.attributes.name;
            div.appendChild(ol);
            body.appendChild(div);
        });

        workouts.included.forEach(exercise => {
            const {name, video_url} = exercise.attributes;
            const li = document.createElement('li');
            li.id = name
            li.innerText = name;
            li.addEventListener('click', () => {
                const frame = document.createElement('iframe');
                frame.src = video_url;
                frame.width = '460';
                frame.height = '315';
                frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                div.appendChild(frame);
            })
            document.getElementById(exercise.relationships.workout.data.id).appendChild(li);
        });
    });
}
