class Habit extends HTMLElement{

    static currID = 0;

    //local storage for persistance potentiall
    //database 
    //post gre docker container
    //sql lite may be another option as well


    constructor(name) {
        this.id = Habit.callcurrID;
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
        this.checkboxState = 0;
        Habit.currID++;
    }

    getName() {
        return this.name;
    }

    getHabitAsRow(){
        
    }

    addHabit(){
        // if(obj['name']){
        //     addHabit(obj.getName());
        //     return;
        // }else{
        //     console.log("this object is not ideal for this function");
        // }
    
        const tableDiv = document.getElementById('tableDiv');
    
        var newElement = document.createElement('div');
        newElement.innerHTML = '<form action="javascript:;" onsubmit=" removeHabit(this) "><input type = "checkbox"></form>'
        tableDiv.appendChild(newElement);
    
        //create and add habit name div
        newElement = document.createElement('div');
        newElement.innerHTML = `<div class = habitText>${this.name}</div>`;
        tableDiv.appendChild(newElement);


        var numDays = 7;
        //add text inputs
        for(var i = 0; i < numDays; i++){
            //create element
            newElement = document.createElement('div');
            newElement.innerHTML = '<div><input type="number" min="0" oninput="toggleComplete()" class = "timeInput" placeholder="# Mins" data-habit = "Exercise"></div>';
            tableDiv.appendChild(newElement);
        }

    }

    


  //need to define what data is needed to define a habit
  //Do we keep the UI elements involved here aswell as the state?

  //A habit for sure has the following things
  //id
  //name
    //start simple with tracking times for a week
  //just have a list of times starting at 0









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