const workoutEndPoint = "http://localhost:3000/api/v1/workouts";
const exerciseEndPoint = "http://localhost:3000/api/v1/exercises";

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
                    li.classList.add('exercises');
                    li.innerText = exercise.attributes.name;
                    li.addEventListener('click', () => {
                        if (li.childElementCount) {
                            li.children[0].remove();
                        } else {
                            const div = document.createElement('div');
                            const frame = document.createElement('iframe');
                            frame.src = exercise.attributes.video_url;
                            frame.width = '360';
                            frame.height = '215';
                            frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                            div.appendChild(frame);
                            li.appendChild(div);
                        }
                    })
                    ul.appendChild(li);
                })
                div.appendChild(ul);
                categoryDiv.appendChild(div);
            } else {
                const div = document.createElement('div');
                div.classList.add('col-md-auto');
                div.innerHTML = `<h5>${element.attributes.name}</h5>`;
                const button = document.createElement('button');
                button.classList.add('deleteWorkout');
                button.innerText = 'Delete Workout';
                button.addEventListener('click', deleteWorkout);
                div.appendChild(button);
                element.relationships.exercises.data.forEach(woEx => {
                    const exercise = obj.data.find(ex => woEx.id === ex.id);
                    const li = document.createElement('li');
                    li.innerText = exercise.attributes.name;
                    li.addEventListener('click', () => {
                        if (li.childElementCount) {
                            li.children[0].remove();
                        } else {
                            const div = document.createElement('div');
                            const frame = document.createElement('iframe');
                            frame.src = exercise.attributes.video_url;
                            frame.width = '360';
                            frame.height = '215';
                            frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                            div.appendChild(frame);
                            li.appendChild(div);
                        }
                    })
                    ul.appendChild(li);
                })
                div.appendChild(ul);
                workoutDiv.appendChild(div);
            }
        });   
    })

const button = document.getElementById('createWorkout');
button.addEventListener('click', () => {
    const div = document.getElementById('workoutForm');
    if (div.childElementCount) {
        button.innerText = 'Create A Workout';
        document.getElementById('workoutForm').firstChild.remove();
    } else {
        button.innerText = 'NeverMind';
        const form = document.createElement('form');
        form.addEventListener('submit', e => {
            e.preventDefault();
            postWorkoutFormData();
            form.remove();
            button.innerText = 'Create A Workout';
        })
        const br = document.createElement('br');
        const labelName = document.createElement('label');
        labelName.innerText = 'Workout Name';
        const nameField = document.createElement('input');
        nameField.setAttribute('type', 'text');
        nameField.setAttribute('name', 'name');
        const catDiv = document.createElement('div');
        catDiv.classList.add('row');
        catDiv.classList.add('justify-content-md-center')
        const submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Create Workout');
        div.appendChild(form);
        form.appendChild(labelName);
        form.appendChild(br);
        form.appendChild(nameField);
        form.appendChild(document.createElement('br'));
        form.appendChild(catDiv);
        const categories = document.getElementById('categories');
        for (const category of categories.children) {
            const div = document.createElement('div');
            div.classList.add('col-md-auto');
            div.id = `${category.id}Selection`;
            const h5 = document.createElement('h5');
            h5.innerText = `${category.id}`;
            div.appendChild(h5);
            catDiv.appendChild(div);
        }
        const exercises = document.getElementsByClassName('exercises');
        for (const exercise of exercises) {
            const div = document.getElementById(`${exercise.parentElement.parentElement.id}Selection`);
            const checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.id = exercise.innerHTML;
            checkBox.value = exercise.innerHTML;
            const label = document.createElement('label');
            label.setAttribute('for', exercise.innerHTML);
            label.innerText = exercise.innerHTML;
            div.appendChild(checkBox);
            div.appendChild(label);
            div.appendChild(document.createElement('br'));
        }
        form.appendChild(document.createElement('br'));
        form.appendChild(submitButton);
    }
})

function postWorkoutFormData() {
    const name = document.querySelector('input[type=text]').value
    const checkedBoxes = document.querySelectorAll('form input:checked');
    const exercises = [];
    for (const checkedBox of checkedBoxes) {
        exercises.push(checkedBox.value);
    }
    postFetchWorkoutForm(name, exercises);
}

function postFetchWorkoutForm(name, exercises) {
    fetch(workoutEndPoint, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            exercises: exercises
        })
    })
    .then(resp => resp.json())
    .then(workout => {
        const workoutDiv = document.getElementById('workouts');
        const ul = document.createElement('ul');
        const div = document.createElement('div');
        div.classList.add('col-md-auto');
        div.innerText = workout.data.attributes.name;
        workout.included.forEach(woEx => {
            const li = document.createElement('li');
            li.innerText = woEx.attributes.name;
            li.addEventListener('click', () => {
                if (li.childElementCount) {
                    li.children[0].remove();
                } else {
                    const div = document.createElement('div');
                    const frame = document.createElement('iframe');
                    frame.src = woEx.attributes.video_url;
                    frame.width = '360';
                    frame.height = '215';
                    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                    div.appendChild(frame);
                    li.appendChild(div);
                }
            })
            ul.appendChild(li);
        })
        div.appendChild(ul);
        workoutDiv.appendChild(div);
    })
}




function deleteWorkout() {
        const workout = this.parentElement.firstElementChild.innerText;
        deleteWorkoutFetch(workout);
        this.parentElement.remove();
}

function deleteWorkoutFetch(name) {
    fetch(`${workoutEndPoint}/${name}`, {
        method: 'delete',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({name: name})
    })
    .then(resp => resp.text())
    .then(mess => window.alert(mess))
}

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
                    li.classList.add('exercises');
                    li.innerText = exercise.attributes.name;
                    li.addEventListener('click', () => {
                        if (li.childElementCount) {
                            li.children[0].remove();
                        } else {
                            const div = document.createElement('div');
                            const frame = document.createElement('iframe');
                            frame.src = exercise.attributes.video_url;
                            frame.width = '360';
                            frame.height = '215';
                            frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                            div.appendChild(frame);
                            li.appendChild(div);
                        }
                    })
                    ul.appendChild(li);
                })
                div.appendChild(ul);
                categoryDiv.appendChild(div);
            } else {
                const div = document.createElement('div');
                div.classList.add('col-md-auto');
                div.innerHTML = `<h5>${element.attributes.name}</h5>`;
                const button = document.createElement('button');
                button.classList.add('deleteWorkout');
                button.innerText = 'Delete Workout';
                button.addEventListener('click', deleteWorkout);
                div.appendChild(button);
                element.relationships.exercises.data.forEach(woEx => {
                    const exercise = obj.data.find(ex => woEx.id === ex.id);
                    const li = document.createElement('li');
                    li.innerText = exercise.attributes.name;
                    li.addEventListener('click', () => {
                        if (li.childElementCount) {
                            li.children[0].remove();
                        } else {
                            const div = document.createElement('div');
                            const frame = document.createElement('iframe');
                            frame.src = exercise.attributes.video_url;
                            frame.width = '360';
                            frame.height = '215';
                            frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                            div.appendChild(frame);
                            li.appendChild(div);
                        }
                    })
                    ul.appendChild(li);
                })
                div.appendChild(ul);
                workoutDiv.appendChild(div);
            }
        });   
    })

    function getExercisesAndRelationships(obj) {
        obj.included.forEach(element => {
            const categoryDiv = document.getElementById('categories');
            const workoutDiv = document.getElementById('workouts');
            const ul = document.createElement('ul');
            if (element.type === 'category') {
                displayCategories(obj, element, ul, categoryDiv);
            } else {
                displayWorkouts(element, obj, ul, workoutDiv);
            }
        })
    }

    function displayCategories(obj, category, ul, catDiv) {
        const {name, description} = category.attributes;
        const div = document.createElement('div');
        div.classList.add('col');
        div.id = name;
        div.innerHTML = `${name} <div>${description}</div>`;
        displayCategoryExercises(obj, category, ul, div);
        catDiv.appendChild(div);
    }

    function displayCategoryExercises(obj, category, ul, div) {
        category.relationships.exercises.data.forEach(catEx => {
            const exercise = obj.data.find(ex => catEx.id === ex.id);
            const li = document.createElement('li');
            li.classList.add('exercises');
            li.innerText = exercise.attributes.name;
            li.addEventListener('click', displayExerciseVideo);
            ul.appendChild(li);
            div.appendChild(ul);
        })
    }

    function displayExerciseVideo() {
        if (this.childElementCount) {
            this.children[0].remove();
        } else {
            const div = document.createElement('div');
            const frame = document.createElement('iframe');
            frame.src = exercise.attributes.video_url;
            frame.width = '360';
            frame.height = '215';
            frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            div.appendChild(frame);
            this.appendChild(div);
        }
    }

    function displayWorkouts(workout, obj, ul, woDiv) {
        const div = document.createElement('div');
        div.classList.add('col-md-auto');
        div.innerHTML = `<h5>${workout.attributes.name}</h5>`;
        const button = document.createElement('button');
        button.classList.add('deleteWorkout');
        button.innerText = 'Delete Workout';
        button.addEventListener('click', deleteWorkout);
        div.appendChild(button);
        displayWorkoutExercises(workout, obj, ul, div);
        woDiv.appendChild(div);
    }

    function displayWorkoutExercises(workout, obj, ul, div) {
        workout.relationships.exercises.data.forEach(woEx => {
            const exercise = obj.data.find(ex => woEx.id === ex.id);
            const li = document.createElement('li');
            li.innerText = exercise.attributes.name;
            li.addEventListener('click', displayExerciseVideo);
            ul.appendChild(li);
            div.appendChild(ul);
        })
    }