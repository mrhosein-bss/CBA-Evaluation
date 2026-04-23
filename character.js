/**********************************************
 * There are 12 "TODO" items in character.js  *
 **********************************************/
class Character {
    //1 TODO: declare private attributes: #name, #attack, #defense, #health, #speed, #maxHealth, #moves, #powers
    #name;
    #attack;
    #defense;
    #health;
    #speed;
    #maxHealth;
    #moves;
    #powers;
    
    #imageObject;
    #backImageObject;

    constructor(name, attack, defense, health, speed) {
        //2 TODO: Initialize private attributes (#name, #attack, #defense, #health, #speed) using the parameters provided.
        this.#name = name;
        this.#attack = attack;
        this.#defense = defense;
        this.#health = health;
        this.#speed = speed;

        //3 TODO: Call the scaleStats() method to ensure stats total to exactly 500.
        this.scaleStats();

        //4 TODO: Initialize #maxHealth to equal #health.
        this.#maxHealth = this.#health;

        //5 TODO: Initialize #moves as an empty array [].
        this.#moves = [];

        //6 TODO: Initialize #powers as an empty array [].
        this.#powers = [];

        //7 TODO: Create new Image() objects and assign them to #imageObject and #backImageObject.
        this.#imageObject = new Image();
        this.#backImageObject = new Image();
    }

    //8 TODO: Create setter and getter methods for all private attributes (e.g., getName(),  setName(val), etc.)
    // #name, #attack, #defense, #health, #speed, #moves, #powers
    // Tip #1: make each method a one-liner
    // Tip #2: use copy & paste 
    setName(x) { this.#name = x; }
    set(x) { this.#name = x; }
    setName(x) { this.#name = x; }
    setName(x) { this.#name = x; }
    setName(x) { this.#name = x; }
    setName(x) { this.#name = x; }

    scaleStats() {
        let total = this.#attack + this.#defense + this.#health + this.#speed;
        let scale = 500 / total;
        this.#attack = Math.round(this.#attack * scale);
        this.#defense = Math.round(this.#defense * scale);
        this.#health = Math.round(this.#health * scale);
        this.#speed = 500 - (this.#attack + this.#defense + this.#health);
    }

    toString() {
        return `${this.#name} - ATK: ${this.#attack}, DEF: ${this.#defense}, HP: ${this.#health}, SPD: ${this.#speed}`;
    }

    async fetchPokeData() {
        try {
            //9 TODO: Stored in queryName, retrieve the character's name and convert it to lowercase.
            let queryName = ""; 

            const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${queryName}`);
            const data1 = await response1.json();
            
            this.#imageObject.src = data1.sprites.front_default;
            this.#backImageObject.src = data1.sprites.back_default;
            
            let randomMoves = [];
            let movePowers = [];
            for(let i=0; i<4; i++) {
                if(data1.moves.length > 0) {
                    let rand = Math.floor(Math.random() * data1.moves.length);
                    const moveName = data1.moves[rand].move.name;
                    const response2 = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
                    const data2 = await response2.json();
                    randomMoves.push(moveName);
                    movePowers.push(Math.max(Number.isNaN(data2.power) ? 30 : data2.power,30));
                }
            }

            //10 TODO: Assign the randomMoves array to your #moves attribute.
            //11 TODO: Assign the movePowers array to your #powers attribute.
            
        } catch(e) {
            console.log("Could not fetch data from PokeAPI.");
        }
    }

    draw(ctx, x, y, isFacingBack) {
        let img = isFacingBack ? this.#backImageObject : this.#imageObject;
        if (img && img.complete) {
            ctx.drawImage(img, x, y, 100, 100);
        }
        
        ctx.fillStyle = "black";
        ctx.font = "bold 14px Courier New";
        ctx.fillText(this.#name, x, y - 20);
        
        //12 TODO: Calculate hpRatio by dividing #health by #maxHealth.
        let hpRatio = 0; // (replace the 0 with the correct calculation)
        ctx.fillStyle = "red";
        ctx.fillRect(x, y - 10, 100, 10);
        ctx.fillStyle = "green";
        ctx.fillRect(x, y - 10, 100 * hpRatio, 10);
    }
}