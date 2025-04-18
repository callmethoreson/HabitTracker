class ApiService{
    async getHabitsByEmail(email){

        try {
            const response = await fetch('/api/habits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email})
            })
        
            //check to see if response is valid
            if(response.status == 404){
                return alert("User not found with that email address");
            }
    
            console.log("api ", response)

            return await response.json();
        }catch(e){
            console.log(`error requesting data: ${e}`)
            return null;
        }

    }

    async getHabitsByUserAndDate(userId, dateLookupId){

        try {

            const response = await fetch(`/api/habits/${userId}/${dateLookupId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        
            if(response.status == 404){
                return alert("Oops, something when wrong :(");
            }

            return await response.json();
        }catch(e){
            console.log(`error requesting data by user and date lookup: ${e}`)
            return null;
        }

    }
}