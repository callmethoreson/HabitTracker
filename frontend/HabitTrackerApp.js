class HabitTrackerApp{

    habitTable;

    api = new ApiService();



    static #instance = null;

    constructor(){
        if(HabitTrackerApp.#instance == null){
            this.habitTable = new HabitTable();
            // HabitTrackerApp.instance = this;
            console.log("App started"); 
        }

        this.maxDateLookupId = 0;
        this.dateLookupId = 0;
        this.userId = 0;

        //TODO, should maybe add an extra class to hande api calls
        // HabitTrackerApp.#instance = Object.freeze(this);
        HabitTrackerApp.#instance = this;
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

    async getIntialHabits(userEmail){
        const res = await this.api.getHabitsByEmail(userEmail);

        if(res === undefined){
            return;
        }

        //hide email form
        document.getElementById("emailForm").style = "display: none";
        //show habit table
        document.getElementById("trackerTable").style = "display: block";

        this.maxDateLookupId = res.dateLookupId;
        this.updateFromBackendResponse(res);
    }

    updateFromBackendResponse(res){
        console.log("Response", res);

        this.habitTable.addHabits(res.habits, res.dates);
        this.dateLookupId = res.dateLookupId;
        this.userId = res.userId;

        console.log("user id", this.userId);
        console.log("date lookup", this.dateLookupId);
        console.log("max lookup", this.maxDateLookupId);
    }

    //Need to setup another route that will give the backend email and id
    //probably use a post and go from there

    //Things to note, at this point in the app we know the user id and the current date lookup id
    //We should be able to make the request with this information for a more straightforward query
    
    //checking can be done based on not being able to have habits in the future or less than 0
    async decrementHabits(){
        if(this.dateLookupId <= 1){
            alert("This is the begining of time tied to this account");
            return;
        }

        try {
            let res = await this.api.getHabitsByUserAndDate(this.userId, this.dateLookupId - 1);
            this.updateFromBackendResponse(res);
        }catch(error){
            console.log(`error requesting data from increment: ${error}`)
        }

    }

    async incrementHabits(){
        if(this.dateLookupId >= this.maxDateLookupId){
            alert("Relax buddy, you can't track the future...");
            return;
        }

        try {
            let res = await this.api.getHabitsByUserAndDate(this.userId, this.dateLookupId + 1);
            this.updateFromBackendResponse(res);
        }catch(error){
            console.log(`error requesting data from increment: ${error}`)
        }

    }
}