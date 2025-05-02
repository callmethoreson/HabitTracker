class HabitTable{

    habits = [];

    constructor(){
        //build out table
        this.buildTable();
    }

    buildTable(){
        //build out table
        this.habits.forEach((habit) => {
            habit.addHabit();
        });
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

    addHabits(habitArray, dates){

        //clear exisiting state from this object and html page
        this.reset();

        //for each habit, create a new habit object
        habitArray.forEach((JSONhabit) => {
            this.habits.push(new Habit(JSONhabit.id, JSONhabit.name, JSONhabit.duration_list));
        });

        //show date selector
        document.getElementById("date-selector").style = "display: block"
        //show add habit block
        document.getElementById("new-habit").style = "display: block";
        document.getElementById("start-date-text").innerHTML = 
            new Date(dates.start_date).toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        document.getElementById("end-date-text").innerHTML = 
            new Date(dates.end_date).toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

        this.buildTable();

    }

    reset(){
        //clear habits table
        this.habits = [];

        //clear html object
        const tableDiv = document.getElementById('tableDiv');

        //add headers back
        tableDiv.innerHTML = `
            <div></div>
            <div class = tableHeader>Habit</div>
            <div class = tableHeader>Sun</div>
            <div class = tableHeader>Mon</div>
            <div class = tableHeader>Tue</div>
            <div class = tableHeader>Wed</div>
            <div class = tableHeader>Thur</div>
            <div class = tableHeader>Fri</div>
            <div class = tableHeader>Sat</div>
            `;
    }

    getHabits(userId, dateLookupId){
        var resHabits = []; 
        
        this.habits.forEach((habit) => {
            resHabits.push(habit.toJson(userId, dateLookupId));
        })

        return resHabits;
    }

    getSelectedHabits(userId, dateLookupId){
        let tempHabits = [];

        this.habits.forEach((habit) => {
            if(habit.markedForRemoval == true){
                tempHabits.push(habit.toJson(userId, dateLookupId));
            }
        });

        return tempHabits;
    }

    getChangedHabits(userId, dateLookupId){
        let tempHabits = [];

        this.habits.forEach((habit) => {
            if(habit.markedForUpdate == true){
                tempHabits.push(habit.toJson(userId, dateLookupId));
            }
        });

        return tempHabits;
    }

}