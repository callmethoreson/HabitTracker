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

    async getHabitsByEmail(userEmail){
        console.log(`email: ${userEmail}`);
        //email validation is handled by html

        try {
            const response = await fetch('/api/habits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: userEmail})
            })
        
            //check to see if response is valid
            if(response.status == 404){
                return alert("User not found with that email address");
            }

            //response is an array
            const habits = await response.json();
            this.habitTable.addHabits(habits);



            // console.log('Habits:', habits);
            // console.log('First habit:', habits[0]); // if it's an array

        } catch (error) {
            console.log(`error requesting data: ${error}`)
        }

    }
}