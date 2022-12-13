import { Component, EventEmitter, Output } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player1',
  templateUrl: './player1.component.html',
  styleUrls: ['./player1.component.css']
})
export class Player1Component {
  constructor(private playerService: PlayerService) { }

  @Output() gotop1 =new EventEmitter();
  @Output() gotop2 =new EventEmitter();
  public diceValue1: number = 0;
  public diceValue2: number = 0;
  public disable1 : boolean=false;
  public disable2 : boolean=false;
  public pos1 :  number=0;
  public pos2 :  number=0;

 

  rollDice1() {
    this.diceValue1 = this.playerService.rollDice();
    if(this.diceValue1!=6){
      this.disable1=true;
    this.disable2=false;
    }
    else{
      this.disable1=false;
    this.disable2=true;
    }
    this.pos1+=this.diceValue1;
    console.log(this.pos1);

    if(this.pos1==100){
      this.disable1=true;
    this.disable2=true;
    alert("Player1 is WINNER")
    }
    else if(this.pos1>100){
      this.pos1-=this.diceValue1;
    }
    else{
    this.pos1 = this.playerService.checkPos(this.pos1-1);

    console.log( "Updated Position for 1 is " + this.pos1);
    this.gotop1.emit(this.pos1);
    }
    
  }

  rollDice2() {
    this.diceValue2 = this.playerService.rollDice();

    if(this.diceValue1!=6){
    this.disable2=true;
    this.disable1=false;
    }
    else{
      this.disable2=false;
    this.disable1=true;
    }

    this.pos2+=this.diceValue2;

    if(this.pos2==100){
      this.disable1=true;
      this.disable2=true;
    alert("Player2 is WINNER")
    }
    else if(this.pos2>100){
      this.pos2-=this.diceValue2;
    }
    else{
    console.log(this.pos2);
    this.pos2 = this.playerService.checkPos(this.pos2-1);
    console.log( "Updated Position for 2 is" + this.pos2);
    this.gotop2.emit(this.pos2);
    }

  }



}



