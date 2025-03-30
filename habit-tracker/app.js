class HabitTrackerApp{

    habitTable;
    static instance = null;

    constructor(){
        if(HabitTrackerApp.instance == null){
            this.habitTable = new HabitTable();
            // HabitTrackerApp.instance = this;
            console.log("App started"); 
        }

        HabitTrackerApp.instance = Object.freeze(this);
    }

    static getInstance() {
        return this.instance || new this();
    }

    addHabitAction(element){
        var textInput = document.getElementById('newHabitName');
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

var habitTrackerApp = new HabitTrackerApp();


function toggleComplete(cell) {
    cell.classList.toggle('completed');
}

function addHabitFromButton(element){
    var app = HabitTrackerApp.getInstance();
    app.addHabitAction(element);
}

function checkBoxChange(element){
    var app = HabitTrackerApp.getInstance();
    app.onCheckBoxChange(element.getAttribute('data-habit-id'), element.checked);
}

function hideHabit(id){
    var app = HabitTrackerApp.getInstance();
    app.hideHabit(id);
}

function hideSelectedItems(){
    var app = HabitTrackerApp.getInstance();
    app.hideSelectedHabits();
}