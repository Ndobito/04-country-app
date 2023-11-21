import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy{


  private debauncer:Subject<string> = new Subject<string>();
  private debauncerSuscription?: Subscription;


  @Input()
  public placeholder:string = '';

  @Input()
  public initialValue?:string = '';


  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debauncerSuscription = this.debauncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe(value => {
      this.onDebounce.emit(value)
    })
  }

  ngOnDestroy(): void {
    this.debauncerSuscription?.unsubscribe();
  }

  emitValue(value:string){
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm:string){
    this.debauncer.next(searchTerm);
  }

}
