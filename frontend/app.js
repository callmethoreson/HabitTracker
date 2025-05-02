let habitTrackerApp = new HabitTrackerApp();

function toggleComplete(cell) {
    cell.classList.toggle('completed');
}

function addHabitFromButton(element){
    let app = HabitTrackerApp.getInstance();
    app.addHabitAction(element);
}

function checkBoxChange(element){
    let app = HabitTrackerApp.getInstance();
    app.onCheckBoxChange(element.getAttribute('data-habit-id'), element.checked);
}

// function hideHabit(id){
//     let app = HabitTrackerApp.getInstance();
//     app.hideHabit(id);
// }

// function hideSelectedItems(){
//     let app = HabitTrackerApp.getInstance();
//     app.hideSelectedHabits();
// }

//Setup event listeners
document.getElementById("emailForm").addEventListener("submit", (e) => {
    e.preventDefault();
    //define email
    console.log("email submitted");
    const email = document.getElementById("emailInput").value;
    HabitTrackerApp.getInstance().getIntialHabits(email);
});

document.getElementById("left-arrow").addEventListener("click", () => {
    HabitTrackerApp.getInstance().decrementHabits();
});

document.getElementById("right-arrow").addEventListener("click", () => {
    HabitTrackerApp.getInstance().incrementHabits();
});

document.getElementById("save-button").addEventListener("click", () => {
    HabitTrackerApp.getInstance().updateHabits();
});

//add new habit with button
document.getElementById("new-habit-button").addEventListener("click", () => {
    HabitTrackerApp.getInstance().addHabit();
});

document.getElementById("delete-button").addEventListener("click", () => {
    HabitTrackerApp.getInstance().removeSelectedHabits();
});

