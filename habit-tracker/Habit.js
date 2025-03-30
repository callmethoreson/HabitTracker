class Habit{

    static currID = 0;

    //local storage for persistance potentiall
    //database 
    //post gre docker container
    //sql lite may be another option as well


    constructor(name) {
        this.id = Habit.currID;
        this.name = name;
        this.timesList = [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];
        this.markedForRemoval = false;
        Habit.currID++;
    }

    getName() {
        return this.name;
    }

    addHabit(){    
        const tableDiv = document.getElementById('tableDiv');

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.setAttribute('data-habit-id', this.id);
        checkbox.setAttribute('action', "javascript:;");
        checkbox.setAttribute('onChange', "checkBoxChange(this)");

        var newElement = document.createElement('div');
        newElement.setAttribute('data-habit-id', this.id);
        newElement.appendChild(checkbox);
        tableDiv.appendChild(newElement);

    
        //create and add habit name div
        newElement = document.createElement('div');
        newElement.setAttribute('data-habit-id', this.id);
        newElement.innerHTML = `<div class = habitText>${this.name}</div>`;
        tableDiv.appendChild(newElement);


        var numDays = 7;
        //add text inputs
        for(var i = 0; i < numDays; i++){
            //create element
            newElement = document.createElement('div');
            newElement.setAttribute('data-habit-id', this.id);
            newElement.innerHTML = '<div><input type="number" min="0" oninput="toggleComplete()" class = "timeInput" placeholder="# Mins" data-habit = "Exercise"></div>';
            tableDiv.appendChild(newElement);
        }

    }

    updateCheckboxState(state){
        this.markedForRemoval = state;
        console.log(`Habit id: ${this.id}, Updated State -> ${this.markedForRemoval}`);
    }

    removeHabit(){
        //console.log("trying to remove element: " + this.id);
        //get all elements with this id
    }

    hideHabit(){
        console.log(`hiding habit ${this.id}`);
        //get all elements with this id as an attribute
        var items = document.querySelectorAll(`[data-habit-id="${this.id}"]`);
        items.forEach( (item) => {
            item.style.display = 'none';
        });
    }

}

const DayIndex = {
    MONDAY:     0,
    TUESDAY:    1,
    WEDNESDAY:  2,
    THURSDAY:   3,
    FRIDAY:     4,
    SATURDAY:   5,
    SUNDAY:     6
};