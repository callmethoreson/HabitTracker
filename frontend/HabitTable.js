class HabitTable{

    habits = [
        // new Habit("Exercise"),
        // new Habit("Learning"),
        // new Habit("Social"),
        // new Habit("Journal"),
    ];

    constructor(){
        //eventually will load stuff from storage?

        //build out table
        this.buildTable();
    }

    buildTable(){
        //build out table
        this.habits.forEach((habit) => {
            habit.addHabit();
        });
    }

    addHabitFromApp(habitTextInput){
        //add habit to list
        let newHabit = new Habit(habitTextInput);
        this.habits.push(newHabit);
        newHabit.addHabit();
    }

    onCheckBoxChange(habitID, state){
        this.getHabitById(habitID).updateCheckboxState(state);
    }

    hideHabit(habitID){
        this.getHabitById(habitID).hideHabit();
    }

    hideSelectedHabits(){
        this.habits.forEach((habit) => {
            if(habit.markedForRemoval == true){
                habit.hideHabit();
            }
        });
    }

    getHabitById(habitID){
        let desHabit = null;

        this.habits.forEach((habit) => {
            if(habit.id == habitID){
                desHabit = habit;
                return;
            }
        });

        return desHabit;
    }

    addHabits(habitArray){

        //clear exisiting state from this object and html page
        this.reset();

        //for each habit, create a new habit object
        habitArray.forEach((JSONhabit) => {
            this.habits.push(new Habit(JSONhabit.name, JSONhabit.duration_list));
        });

        this.buildTable();
    }

    reset(){
        //clear habits table
        this.habits = [];

        //clear html object
        const tableDiv = document.getElementById('tableDiv');
        tableDiv.innerHTML = '';
    }

}