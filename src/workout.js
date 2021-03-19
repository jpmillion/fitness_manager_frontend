class Workout {
    constructor(workout) {
        this.id = workout.id;
        this.name = workout.attributes.name;
        Workout.all.push(this);
    }

    renderWorkout() {
        const workoutDiv = document.getElementById('workouts');
        const div = document.createElement('div');
        div.classList.add('col-md-auto');
        div.innerHTML = `<h5>${this.name}</h5>`;
        const button = document.createElement('button');
        button.className = 'deleteWorkout btn btn-dark';
        button.innerText = 'Delete Workout';
        button.addEventListener('click', deleteWorkout);
        const ul = document.createElement('ul');
        ul.dataset.workoutId = this.id;
        div.appendChild(button);
        div.appendChild(ul);
        workoutDiv.appendChild(div);
    }

    static createWorkoutFormElements() {
        const workoutFormDiv = document.getElementById('workoutForm');
        const form = document.createElement('form');
        form.classList.add('d-none');    
        const labelName = document.createElement('label');
        labelName.innerHTML = '<h6>Workout Name:</h6>';
        const nameField = document.createElement('input');
        nameField.id = 'createdWorkoutName';
        nameField.setAttribute('type', 'text');
        nameField.setAttribute('name', 'name');
        const catDiv = document.createElement('div');
        catDiv.classList.add('row');
        catDiv.classList.add('justify-content-md-center')
        const submitButton = document.createElement('input');
        submitButton.className = 'btn btn-dark';
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Create Workout');
        workoutFormDiv.appendChild(form);
        form.appendChild(labelName);
        form.appendChild(document.createElement('br'));
        form.appendChild(nameField);
        form.appendChild(document.createElement('br'));
        form.appendChild(catDiv);
        form.appendChild(document.createElement('br'));
        form.appendChild(submitButton);
        form.addEventListener('submit', e => submitWorkoutForm(e));
    }

    static toggleWorkoutForm() {
        const button = document.getElementById('createWorkout');
        const form = document.querySelector('form');
        button.addEventListener('click', () => {
            if (form.className === 'd-none') {
                button.innerText = 'Nevermind';
                form.classList.remove('d-none'); 
            } else {
                button.innerText = 'Create A Workout';
                form.classList.add('d-none');
            }
        });
    }

    static postWorkoutFormData() {
        const name = document.getElementById('createdWorkoutName').value
        const checkedBoxes = document.querySelectorAll('form input:checked');
        const exercises = [];
        for (const checkedBox of checkedBoxes) {
            exercises.push(checkedBox.value);
        }
        this.postFetchWorkoutFormData(name, exercises, Athlete.all[0].id);
    }

    static postFetchWorkoutFormData(name, exercises, athleteID) {
        fetch(workoutEndPoint, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                exercises: exercises,
                athlete_id: athleteID
            })
        })
            .then(resp => resp.json())
            .then(workout => {
                if (workout.errors) {
                    window.alert(workout.errors);
                } else {
                    new Workout(workout.data).renderWorkout();
                    workout.included.forEach(exercise => new Exercise(exercise).renderExercise4Workout());
                    window.alert('Succesfully Created Workout');
                }
            })
            .catch(error => window.alert(error.message))
    }
}

Workout.all = [];

function submitWorkoutForm(e) {
    e.preventDefault();
    const form = document.querySelector('form');
    form.classList.add('d-none');
    document.getElementById('createWorkout').innerText = 'Create A Workout';
    Workout.postWorkoutFormData();
    form.reset();
}

function deleteWorkout() {
    const id = this.parentElement.querySelector('ul').dataset.workoutId;
    const name = this.parentElement.querySelector('h5').innerText;
    this.parentElement.remove();
    fetch(`${workoutEndPoint}/${id}`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name })
    })
        .then(resp => resp.text())
        .then(mess => window.alert(mess))
        .catch(error => window.alert(error))
}