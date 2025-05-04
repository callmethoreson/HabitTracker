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

    periodic(){
        console.log("periodic loop running!");

        let habits = this.habitTable.getChangedHabits(this.userId, this.dateLookupId);

        if(habits.length !== 0){
            this.updateHabits(habits);
        }else{
            console.log("no habits to update!");
        }

        //use habit table to check for updates
        //use api to send a fresh habit package

    }

    async addHabit(){
        let textInput = document.getElementById('newHabitName');

        //TODO, more input validation, regex maybe?
        if(textInput.value == ""){
            alert("Habit must have a valid name!")
            return;
        }

        this.api.addHabitByName(textInput.value, this.userId, this.dateLookupId);
        this.refreshHabits();
        textInput.value = "";
    }

    async removeSelectedHabits(){
        //build out list as json package, similar to post
        let habits = this.habitTable.getSelectedHabits(this.userId, this.dateLookupId);
        await this.api.deleteHabitPackage(habits, this.userId, this.dateLookupId);
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


    //Things to note, at this point in the app we know the user id and the current date lookup id
    //We should be able to make the request with this information for a more straightforward query
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
    async updateHabits(habitList){
        let habits = this.habitTable.getHabits(this.userId, this.dateLookupId);

        //if no habits, send full list
        if(habitList){ //if its empty
            //let habits = this.habitTable.getHabits(this.userId, this.dateLookupId);
            habits = habitList;
        }

        await this.api.postHabitPackage(habits, this.userId, this.dateLookupId);
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