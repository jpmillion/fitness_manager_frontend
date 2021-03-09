const workoutEndPoint = "http://localhost:3000/api/v1/workouts";
const exerciseEndPoint = "http://localhost:3000/api/v1/exercises";

// getWorkouts();

// function getWorkouts() {
//     fetch(workoutEndPoint)
//     .then(resp => resp.json())
//     .then(workouts => {
//         const body = document.querySelector('body');
//         const div = document.createElement('div');

//         workouts.data.forEach(workout => {
//             const ol = document.createElement('ol');
//             ol.id = workout.id;
//             div.innerText = workout.attributes.name;
//             div.appendChild(ol);
//             body.appendChild(div);
//         });

//         workouts.included.forEach(exercise => {
//             const {name, video_url} = exercise.attributes;
//             const li = document.createElement('li');
//             li.id = name
//             li.innerText = name;
//             li.addEventListener('click', () => {
//                 const frame = document.createElement('iframe');
//                 frame.src = video_url;
//                 frame.width = '460';
//                 frame.height = '315';
//                 frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
//                 div.appendChild(frame);
//             })
//             document.getElementById(exercise.relationships.workout.data.id).appendChild(li);
//         });
//     });
// }

fetch(exerciseEndPoint)
    .then(resp => resp.json())
    .then(obj => {
        obj.included.forEach(element => {
            const categoryDiv = document.getElementById('categories');
            const workoutDiv = document.getElementById('workouts');
            const ul = document.createElement('ul');
            if (element.type === 'category') {
                const {name, description} = element.attributes;
                const div = document.createElement('div');
                div.classList.add('col');
                div.id = name;
                div.innerHTML = `${name} <div>${description}</div>`;
                element.relationships.exercises.data.forEach(catEx => {
                    const exercise = obj.data.find(ex => catEx.id === ex.id);
                    const li = document.createElement('li');
                    li.innerText = exercise.attributes.name + '      ' + exercise.attributes.video_url;
                    ul.appendChild(li);
                })
                div.appendChild(ul);
                categoryDiv.appendChild(div);
            } else {
                const div = document.createElement('div');
                div.classList.add('col-md-auto');
                div.innerText = element.attributes.name;
                element.relationships.exercises.data.forEach(woEx => {
                    const exercise = obj.data.find(ex => woEx.id === ex.id);
                    const li = document.createElement('li');
                    li.innerText = exercise.attributes.name + '      ' + exercise.attributes.video_url;
                    ul.appendChild(li);
                })
                div.appendChild(ul);
                workoutDiv.appendChild(div);
            }
        });

        
    })
