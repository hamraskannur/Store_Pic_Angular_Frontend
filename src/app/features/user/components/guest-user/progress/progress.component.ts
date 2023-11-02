import { Component, Input, OnInit,OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit,OnChanges {
  @Input() progressValue : number =10
  circumference:number=0
  percent: number=0
  ngOnInit() {
    this.circumference = 50 * 2 * Math.PI;
    this.percent = this.progressValue;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('progressValue' in changes) {
      this.percent = this.progressValue; 
       }
  }

}
