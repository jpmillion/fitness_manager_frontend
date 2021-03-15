class Workout {
    constructor(workout) {
        this.name = workout.attributes.name;
        Workout.all.push(this);
    }
}

Workout.all = [];