let habitTrackerApp = new HabitTrackerApp();

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

//Every 5 seconds in the app, run a function to automatically update
setInterval(() => {
    HabitTrackerApp.getInstance().periodic();
}, 500);
