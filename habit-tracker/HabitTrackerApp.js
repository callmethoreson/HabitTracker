class HabitTrackerApp{

    habitTable;
    static #instance = null;

    constructor(){
        if(HabitTrackerApp.#instance == null){
            this.habitTable = new HabitTable();
            // HabitTrackerApp.instance = this;
            console.log("App started"); 
        }

        HabitTrackerApp.#instance = Object.freeze(this);
    }

    static getInstance() {
        return this.#instance || new this();
    }

    addHabitAction(element){
        let textInput = document.getElementById('newHabitName');

        //TODO, more input validation, regex maybe?
        if(textInput.value == ""){
            alert("Habit must have a valid name!")
            return;
        }

        this.habitTable.addHabitFromApp(textInput.value);
        textInput.value = "";
    }

    onCheckBoxChange(habitID, state){
        this.habitTable.onCheckBoxChange(habitID, state);
    }

    hideHabit(habitID){
        this.habitTable.hideHabit(habitID);
    }

    hideSelectedHabits(){
        this.habitTable.hideSelectedHabits();
    }
}