class Person {
    constructor (personName) {
        this.personName = personName;
    }
}

class Chore {
    constructor(person, description, status, createdDate) {
        if (person instanceof Person) {
            this.person = person;
        }else {
            throw new Error(`You can only add an instance of Player. 
            argument is not a player: ${person}`);
        }
        this.description = description;
        this.status = status;
        this.createdDate = createdDate;       
    }    
}

class Menu { // what drives the application and our choices
    constructor() {
        this.chores = [];  
        this.people = [];       
        this.selectedChore = null; // manage one chore at a time    }
    }
    
    programNotifications(msg){
        let msgString = '';                
        if(this.chores.length === 0) { //If there are not chores, then return a message back to the calling function that there is not data.
          //  alert(this.chores.length);
            switch(msg) {
                case 'Delete':
                    msgString = "There are not chores to delete.";
                   // alert("Delete");
                    break;
                case 'View':
                    msgString = "There are not chores to do!";                 
                    break;                    
                default:  
                    msgString = "Nothing!";            
                }
        } else {
            
                for (let i = 0; i < this.chores.length; i++) { //List chores if there are any
                    msgString += i + ') ' + this.chores[i].description + ' | ' +  this.chores[i].person.personName + this.chores[i].createdDate + '\n';
                }    
        }
        
        return msgString; // Then return the notification string

    }

    start() { // entry point to application
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createChore();
                    break;
                case '2':
                    this.deleteChore();
                    break;
                case '3':
                    this.viewChores();
                    break;              
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();            
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt('--------  Welcome to the ChoresToDo App  --------' + '\n\n' + `
            0) exit
            1) create a chore  
            2) delete a chore
            3) view chores

            `);
    console.log(`${this.chores.length}`);
    }

    createChore() {//Collect the information to create the chore and push to chores and people arrays
        let personResponsable = new Person(prompt('Enter who will complete this chore: '));                     
        let description = prompt('Enter a chore: ');        
        let status = 'Not completed'; 
        let createdDate = (new Date()).toLocaleString();
        if(personResponsable !== "" && description !== "") {   
            this.chores.push(new Chore(personResponsable, description, status, createdDate));
            this.people.push(personResponsable.personName);  
        }else {
            alert("Chore details cannot be empty, try again.");
        }

    }

    deleteChore() {    
       
        let choresString = '';             
        if(this.chores.length >= 1) {//
   

            for (let i = 0; i < this.chores.length; i++) {
                choresString += i + ') ' + this.chores[i].description + ' | ' +  this.chores[i].person.personName + '\n';
            }             
           

            let index = prompt(choresString + '\n\n' + `---------------------------------------------------` + '\n' +
                'Enter the index of the Chore that you wish to delete: ');
           
            if (index !== null && index <= this.chores.length && index !== "") {
                
                this.chores.splice(index, 1);
            }
        }  else {

            alert(this.programNotifications('Delete'));   
        }
        
    }



    viewChores() {
        let choresString = '';    

        if(this.chores.length >= 1) {
            for (let i = 0; i < this.chores.length; i++) {
                choresString += i + ') ' + this.chores[i].description + ' | ' +  this.chores[i].person.personName + '\n';
            }             
                      
            let index = prompt(choresString + '\n' + `---------------------------------------------------` + '\n' +
                'Enter the index of the Chore that you wish to see: ');

            if (index !== null && index <= this.chores.length) { 

                if(index !== "") { 
                    
                    alert(`Chore: ${this.chores[index].description} ` + '\n' +
                            `Person Reposnsable: ${this.chores[index].person.personName} ` + '\n' +
                            `Status:  ${this.chores[index].status} ` + '\n' +
                            `Created: ${this.chores[index].createdDate} ` + '\n');
                }
            }  
        }

      else {

            alert(this.programNotifications('View'));   
        }  
    }

    deletePerson() {
        let index = prompt('Enter the index of the person that you wish to delete: ');
        if (index > -1 && index < this.selectedChore.person.length) {
            this.selectedChore.person.splice(index, 1);
        }
    }
}


let menu = new Menu();
menu.start();