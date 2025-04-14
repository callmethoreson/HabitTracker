class HabitTrackerApp{

    habitTable;
    static #instance = null;

    constructor(){
        if(HabitTrackerApp.#instance == null){
            this.habitTable = new HabitTable();
            // HabitTrackerApp.instance = this;
            console.log("App started"); 
        }


        //TODO, should maybe add an extra class to hande api calls
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

            const res = await response.json();

            console.log("initial response: ", res)

            //response is an array
            const habits = res.list;
            const dates = res.dates;
            this.habitTable.dateLookupId = res.dateLookupId;
            this.habitTable.maxDateLookupId = this.habitTable.dateLookupId;
            this.habitTable.userId = res.userId;

            console.log("habits", habits);
            console.log("dates", dates);
            console.log("user id", this.habitTable.userId);
            console.log("date lookup", this.habitTable.dateLookupId);

            //should also update dates of the table...
            this.habitTable.addHabits(habits, dates);

        } catch (error) {
            console.log(`error requesting data: ${error}`)
        }

    }

    updateAppState(state){
        
    }

    //Need to setup another route that will give the backend email and id
    //probably use a post and go from there

    //Things to note, at this point in the app we know the user id and the current date lookup id
    //We should be able to make the request with this information for a more straightforward query
    
    //checking can be done based on not being able to have habits in the future or less than 0
    async decrementHabits(){
        if(this.habitTable.dateLookupId === 1){
            alert("This is the begining of time tied to this account");
            return;
        }

        this.habitTable.dateLookupId--;

        try {

            console.log("user id", this.habitTable.userId);
            console.log("date lookup", this.habitTable.dateLookupId);

            const response = await fetch(`/api/habits/${this.habitTable.userId}/${this.habitTable.dateLookupId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        
            //check to see if response is valid
            if(response.status == 404){
                return alert("Oops, something when wrong :(");
            }

            const res = await response.json();

            //response is an array
            const habits = res.list;
            const dates = res.dates;
            this.habitTable.dateLookupId = res.dateLookupId;

            console.log("habits (decremented)", habits);
            console.log("dates (decremented)", dates);

            //should also update dates of the table...

            this.habitTable.addHabits(habits, dates);



            // console.log('Habits:', habits);
            // console.log('First habit:', habits[0]); // if it's an array

        }catch(error){
            console.log(`error requesting data from decrement: ${error}`)
            this.habitTable.dateLookupId++;
        }

    }

    async incrementHabits(){
        if(this.habitTable.dateLookupId === this.habitTable.maxDateLookupId){
            alert("Relax buddy, you can't track the future...");
            return;
        }

        this.habitTable.dateLookupId++;


        try {

            console.log("user id", this.habitTable.userId);
            console.log("date lookup", this.habitTable.dateLookupId);

            const response = await fetch(`/api/habits/${this.habitTable.userId}/${this.habitTable.dateLookupId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        
            //check to see if response is valid
            if(response.status == 404){
                return alert("Oops, something when wrong :(");
            }

            const res = await response.json();

            //response is an array
            const habits = res.list;
            const dates = res.dates;
            this.habitTable.dateLookupId = res.dateLookupId;

            console.log("habits (decremented)", habits);
            console.log("dates (decremented)", dates);

            //should also update dates of the table...

            this.habitTable.addHabits(habits, dates);

        }catch(error){
            console.log(`error requesting data from decrement: ${error}`)
            this.habitTable.dateLookupId--;
        }


    }
}