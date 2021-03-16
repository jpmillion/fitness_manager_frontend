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
        button.classList.add('deleteWorkout');
        button.innerText = 'Delete Workout';
        // button.addEventListener('click', deleteWorkout);
        const ul = document.createElement('ul');
        ul.dataset.workoutId = this.id;
        div.appendChild(button);
        div.appendChild(ul);
        // div.appendChild(displayExercises(workout, obj));
        workoutDiv.appendChild(div);
    }

    static createWorkoutFormElements() {
        const workoutFormDiv = document.getElementById('workoutForm');
        const form = document.createElement('form');
        form.classList.add('d-none');    
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
        workoutFormDiv.appendChild(form);
        form.appendChild(labelName);
        form.appendChild(document.createElement('br'));
        form.appendChild(nameField);
        form.appendChild(document.createElement('br'));
        form.appendChild(catDiv);
        // createExerciseElementsForWorkoutForm();
        form.appendChild(document.createElement('br'));
        form.appendChild(submitButton);
    }

    static toggleWorkoutForm() {
        const button = document.getElementById('createWorkout');
        const form = document.querySelector('form');
        button.addEventListener('click', () => {
            if (form.className === 'd-none') {
                this.innerText = 'Nevermind';
                form.classList.remove('d-none'); 
            } else {
                this.innerText = 'Create A Workout';
                form.classList.add('d-none');
            }
        });
    }
}

Workout.all = [];