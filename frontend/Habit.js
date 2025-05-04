class Habit{

    constructor(id, name, durationList) {
        this.id = id;
        this.name = name;
        this.durationList = Object.values(durationList);
        this.markedForRemoval = false;
        this.markedForUpdate = false;
    }

    addHabit(){    
        const tableDiv = document.getElementById('tableDiv');

        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.setAttribute('data-habit-id', this.id);
        checkbox.addEventListener("change", (e) => this.updateCheckboxState(e));

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
        this.durationList.forEach((entry, i) => {
            //create input
            const input = document.createElement('input');
            input.type = "number";
            input.min = "0";
            input.className = "timeInput";
            input.setAttribute('data-habit', this.name);
            input.placeholder = "# mins";
            input.value = entry;

            // add listener directly to input
            input.addEventListener("change", (e) => this.updateDurationList(i, e));

            newElement = document.createElement('div');
            newElement.setAttribute('data-habit-id', this.id);
            newElement.appendChild(input);
            tableDiv.appendChild(newElement);
        });

    }

    updateDurationList(index, event){
        //mark the current habit as dirty?
        const value = parseInt(event.target.value) || 0;
        this.durationList[index] = value;
        this.markedForUpdate = true;
        console.log(`Updated habit ${this.name} (${index}) to ${value} mins`);
    }

    updateCheckboxState(event){
        this.markedForRemoval = event.target.checked;
        console.log(`Habit: ${this.id}, MarkedForRemoval State -> ${this.markedForRemoval}`);
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