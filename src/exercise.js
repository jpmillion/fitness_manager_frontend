class Exercise {
    constructor(exercise) {
        this.id = exercise.id;
        this.name = exercise.attributes.name;
        this.videoUrl = exercise.attributes.video_url;
        this.categoryId = exercise.relationships.category.data.id;
        this.workout = exercise.relationships.workout.data;
        Exercise.all.push(this);
    }

    renderExercise() {
        this.renderExercise4Category();
        this.renderExercise4Workout();
    }

    renderExercise4Workout() {
        const li = this.exerciseListItem();
        this.returnWorkoutListForExercise().appendChild(li);
    }

    renderExercise4Category() {
        const li = this.exerciseListItem();
        this.returnCategoryListForExercise().appendChild(li);       
        this.renderExerciseForWorkoutForm(li.cloneNode(true));
    }

    renderExerciseForWorkoutForm(li) {
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.value = this.name;
        const ul = document.getElementById(`${this.categoryId}Selection`);
        li.appendChild(checkBox);
        ul.appendChild(li);
    }

    returnCategoryListForExercise() {
        return document.querySelector(`ul[data-category-id='${this.categoryId}']`);
    }

    returnWorkoutListForExercise() {
        return document.querySelector(`ul[data-workout-id='${this.workout.id}']`)
    }

    createExerciseVideoDiv() {
        const div = document.createElement('div');
        div.classList.add('d-none');
        const frame = document.createElement('iframe');
        frame.src = this.videoUrl;
        frame.width = '360';
        frame.height = '215';
        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        div.appendChild(frame);
        return div;
    }

    exerciseListItem() {
        const li = document.createElement('li');
        li.innerText = this.name;
        const div = this.createExerciseVideoDiv();
        li.appendChild(div);
        li.addEventListener('click', Exercise.toggle);
        return li;
    }

    static toggle() {
        const div = this.firstElementChild;
        div.className === 'd-none' ? div.classList.remove('d-none') : div.classList.add('d-none');
    }
}

Exercise.all = [];

