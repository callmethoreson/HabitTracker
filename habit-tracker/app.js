function toggleComplete(cell) {
    cell.classList.toggle('completed');
}

function buildTable(){

    //create habit objects
    var exer = new Habit("Exercise")

    var habits = [
        new Habit("Exercise"),
        new Habit("Learning"),
        new Habit("Social"),
        new Habit("Journal"),
    ];

    //add habits
    habits.forEach((habit) => {
        habit.addHabit();
    });

}

function addHabitFromButton(element){
    //get element
    textInput = document.getElementById('newHabitName');

    if(textInput.value == ""){
        alert("Habit must have a valid name!")
        return;
    }

    habits.add(new Habit(textInput.value));

    habits.last();

    console.log(textInput.value);
    addHabit(textInput.value);
    textInput.value = "";
}

function removeHabit(element){
    console.log(element);
}

buildTable();
console.log("table built");

const habit1 = new Habit("habitInstance");
addHabit(habit1);
