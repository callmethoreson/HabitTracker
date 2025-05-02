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

    async addHabit(){
        let textInput = document.getElementById('newHabitName');

        //TODO, more input validation, regex maybe?
        if(textInput.value == ""){
            alert("Habit must have a valid name!")
            return;
        }

        //rethink how this will work

        //we should send a request to the backend
        //if successful, we should reload the frontend
        //if it fails, alert the user that something when wrong
        //habit table shouldn't need to handle this

        //need new function in api service, should take in similar info to other api calls
        //userId, dateLookupId
        this.api.addHabitByName(textInput.value, this.userId, this.dateLookupId);

        //TODO, refresh page automagically
        this.refreshHabits();

        //this.habitTable.addHabitFromApp(textInput.value);
        textInput.value = "";
    }

    onCheckBoxChange(habitID, state){
        this.habitTable.onCheckBoxChange(habitID, state);
    }

    hideHabit(habitID){
        this.habitTable.hideHabit(habitID);
    }

    async removeSelectedHabits(){
        //build out list as json package, similar to post
        let habits = this.habitTable.getSelectedHabits(this.userId, this.dateLookupId);

        try {
            let res = await this.api.deleteHabitPackage(habits, this.userId, this.dateLookupId);
        }catch(error){
            console.log(`error updating habits: ${error}`)
        }

        this.refreshHabits();

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
        this.habitTable.dateLookupId = res.dateLookupId;
        this.habitTable.userId = res.userId;

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

    //Send out response to update habits for the current week and user
    //This may eventually want to live somewhere else, may be done automatically
    //When incrementing or decrementing to a different week
    //Also, those functions could probaby be combined.
    async updateHabits(){
        let habits = this.habitTable.getHabits(this.userId, this.dateLookupId);

        try {
            let res = await this.api.postHabitPackage(habits, this.userId, this.dateLookupId);
            // this.updateFromBackendResponse(res);
        }catch(error){
            console.log(`error updating habits: ${error}`)
        }

        this.refreshHabits();

    }

    async refreshHabits(){
        try {
            let res = await this.api.getHabitsByUserAndDate(this.userId, this.dateLookupId);
            this.updateFromBackendResponse(res);
        }catch(error){
            console.log(`error requesting data from increment: ${error}`)
        }

    }

}