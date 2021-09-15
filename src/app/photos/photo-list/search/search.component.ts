import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  filter: string = '';

  @Output() onTyping: EventEmitter<string> = new EventEmitter<string>();
  @Input() value: string = '';

  ngOnInit(): void {}

  onKeyUp(target: any) {
    if (target instanceof EventTarget) {
      var elemento = target as HTMLInputElement;
      this.filter = elemento.value;
      this.onTyping.emit(this.filter);
    }
  }
}
