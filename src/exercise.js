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
        li.id = this.videoUrl;
        const div = this.createExerciseVideoDiv();
        li.appendChild(div);
        li.addEventListener('click', () => div.className === 'd-none' ? div.classList.remove('d-none') : div.classList.add('d-none'))
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
}

Exercise.all = [];