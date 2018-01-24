﻿//Turn Manager Class. Handles input, player actions and enemy actions.

class TurnManager {
    constructor(survivor, gameboard) {
        console.log("Turn Manager Created.");
        //The number of turns.
        this.turnNum = 0;
        //The Survivor.
        this.survivor = survivor;
        //The Game Board.
        this.gameboard = gameboard;
        //Whether input is accepted or not.
        this.inputAccepted = true;

        //Handle Keyboard Input.
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            //console.log("Key Pressed: " + keyName);
            this.turn(keyName);
        })
    }


    //The turn sequence.
    turn(key) {
        console.log("Key Pressed: " + key)

        //Only allow input if all previous action has completed.
        if (this.inputAccepted) {
            //Disable user input.
            this.inputAccepted = false;

            //Increment the turn number.
            this.turnNum++;

            //Resolve the player's actions.
            this.playerAction(key);

            //Check to see if the player has moved to the exit. If he has, end level.
            if (this.survivor.getCurrentTile().getType() == 'exit') {
                console.log("Survivor has reached exit.");
                //TODO: Level end logic.
            }

            //If survivor has not reached exit, resolve the enemy's actions.






            //console.log("Waiting...");
            //setTimeout(function () {
            //    this.inputAccepted = true;
            //}, 1500);
            //console.log("Done Waiting.");


            //Return input to user.
            this.inputAccepted = true;
        }
        
    }

    //Initiate player action.
    playerAction(key) {
        //Get the survivor's tile.
        var survTile = this.survivor.getCurrentTile();

        switch (key) {
            case 'd': //Attempt to move the survivor to the right.
                var candidateTile = this.gameboard.findTile(survTile.getTileX() + 1, survTile.getTileY());
                if (candidateTile.canBePassed()) {
                    this.survivor.setTile(candidateTile);
                } else {
                    
                }
                break;
            case 'w': //Attempt to move the survivor up.
                var candidateTile = this.gameboard.findTile(survTile.getTileX(), survTile.getTileY() - 1);
                if (candidateTile.canBePassed()) {
                    this.survivor.setTile(candidateTile);
                } else {

                }
                
                break;
            case 'a': //Attempt to move the survivor left.
                var candidateTile = this.gameboard.findTile(survTile.getTileX() - 1, survTile.getTileY());
                if (candidateTile.canBePassed()) {
                    this.survivor.setTile(candidateTile);
                } else {

                }
                break;
            case 's': //Attempt to move the survivor down.
                var candidateTile = this.gameboard.findTile(survTile.getTileX(), survTile.getTileY() + 1);
                if (candidateTile.canBePassed()) {
                    this.survivor.setTile(candidateTile);
                } else {

                }
                break;
            case 'space': //Attempt to attack in the direction the survivor is facing.
                break;
            default:
                console.log("Not a valid key.");
                break;
        }


        


    }

    enemyAction() {
        //TODO
    }




}