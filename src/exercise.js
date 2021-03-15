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
        const li = document.createElement('li');
        li.innerText = this.name;
        li.id = this.video_url;
        // li.addEventListener('click', displayExerciseVideo);
        this.findCategoryListForExercise().appendChild(li);
        if (this.workout) this.findWorkoutListForExercise().appendChild(li);
        // ul.appendChild(li);
    }

    findCategoryListForExercise() {
        return document.querySelector(`ul[data-category-id='${this.categoryId}']`);
    }

    findWorkoutListForExercise() {
        return document.querySelector(`ul[data-workout-id='${this.workout.id}']`)
    }
}

Exercise.all = [];