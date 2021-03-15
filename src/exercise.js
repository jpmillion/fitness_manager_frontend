class Exercise {
    constructor(exercise, category, workout) {
        this.id = exercise.id;
        this.name = exercise.attributes.name;
        this.videoUrl = exercise.attributes.video_url;
        this.category = category
        this.workout = workout
        Exercise.all.push(this);
    }
}

Exercise.all = [];