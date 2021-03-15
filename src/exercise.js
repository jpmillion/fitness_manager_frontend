class Exercise {
    constructor(exercise) {
        this.id = exercise.id;
        this.name = exercise.attributes.name;
        this.videoUrl = exercise.attributes.video_url;
        this.categoryId = relationships.category.data.id;
        this.workoutId = relationships.workout.data.id;
        Exercise.all.push(this);
    }
}

Exercise.all = [];