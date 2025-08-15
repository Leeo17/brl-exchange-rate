import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private apiService: ApiService) {}

  showExchangeRate: boolean = false;
  currencyCode: string = '';
  inputValue = '';
  exchangeRate: number = 0;

  valueChanged(value: string) {
    this.inputValue = value;
  }

  exchangeResult() {
    if (!this.inputValue) {
      alert('Please type the currency code.');
      return;
    }

    this.showExchangeRate = false;
    this.currencyCode = this.inputValue.trim().toUpperCase();

    this.apiService.getCurrentExchangeRate(this.currencyCode).subscribe({
      next: (data) => {
        if (data?.success) {
          this.exchangeRate = data?.exchangeRate || 0;
          this.showExchangeRate = true;
        } else {
          alert('Failed to fetch exchange rate. Please try again.');
        }
      },
      error: (error) => {
        alert('Failed to fetch exchange rate. Please try again.');
        console.error('Error fetching exchange rate:', error);
      },
    });
  }
}
