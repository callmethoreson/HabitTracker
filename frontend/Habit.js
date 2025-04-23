class Habit{

    static currID = 0;

    //local storage for persistance potentiall
    //database 
    //post gre docker container
    //sql lite may be another option as well

    constructor(id, name, durationList) {
        this.id = id;
        this.name = name;
        this.durationList = Object.values(durationList);
        this.markedForRemoval = false;
    }

    getName() {
        return this.name;
    }

    addHabit(){    
        const tableDiv = document.getElementById('tableDiv');

        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.setAttribute('data-habit-id', this.id);
        checkbox.setAttribute('action', "javascript:;");
        checkbox.setAttribute('onChange', "checkBoxChange(this)");

        let newElement = document.createElement('div');
        newElement.setAttribute('data-habit-id', this.id);
        newElement.appendChild(checkbox);
        tableDiv.appendChild(newElement);

        //create and add habit name div
        newElement = document.createElement('div');
        newElement.setAttribute('data-habit-id', this.id);
        newElement.innerHTML = `<div class = habitText>${this.name}</div>`;
        tableDiv.appendChild(newElement);

        //use for each loop on duration list
        //todo add listener that will update
        this.durationList.forEach((entry, i) => {
            //create element
            newElement = document.createElement('div');
            newElement.setAttribute('data-habit-id', this.id);
            newElement.innerHTML = `
            <div>
                <input type="number" 
                min="0" 
                oninput="toggleComplete()" 
                class = "timeInput" 
                data-habit = ${this.name} 
                placeholder = # mins
                value = ${entry}>
            </div>`;
            newElement.addEventListener("change", (e) => this.updateDurationList(i, e));
            tableDiv.appendChild(newElement);
        });

    }

    updateDurationList(index, event){
        //mark the current habit as dirty?
        const value = parseInt(event.target.value) || 0;
        this.durationList[index] = value;
        console.log(`Updated habit ${this.name} (${index}) to ${value} mins`);
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
        let items = document.querySelectorAll(`[data-habit-id="${this.id}"]`);
        items.forEach( (item) => {
            item.style.display = 'none';
        });
    }

    toJson(userId, dateLookupId){
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const durationObj = {};

        //build duration list
        days.forEach((day, i) => {
            durationObj[day] = this.durationList[i] || 0;
        })

        //return properly formatted habit object
        return {
            id: this.id,
            name: this.name,
            user_id: userId,
            date_lookup_id: dateLookupId,
            duration_list: durationObj
        };

    }

}