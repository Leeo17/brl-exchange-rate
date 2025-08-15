import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Output() valueEvent = new EventEmitter<string>();

  onCurrencyCodeChange(event: any) {
    this.valueEvent.emit(event.target.value);
  }
}
