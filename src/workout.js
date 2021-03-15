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
}

Workout.all = [];