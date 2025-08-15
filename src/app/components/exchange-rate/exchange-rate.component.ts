import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {
  @Input() currencyCode: string = '';
  @Input() exchangeRate: number = 0;

  dateTime: string = '';
  value: string = '';
  isLast30DaysOpen: boolean = false;
  dailyRates: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.dateTime = this.formatDate(true);
    this.value = this.formatCurrency(this.exchangeRate, 2);
  }

  toggleLast30Days() {
    if (this.isLast30DaysOpen) {
      this.isLast30DaysOpen = false;
      return;
    }

    this.apiService.getDailyExchangeRate(this.currencyCode).subscribe({
      next: (response) => {
        if (response?.success) {
          this.dailyRates = response?.data || [];
          this.isLast30DaysOpen = true;
        } else {
          alert('Failed to fetch daily exchange rate. Please try again.');
        }
      },
      error: (error) => {
        alert('Failed to fetch daily exchange rate. Please try again.');
        console.error('Error fetching exchange rate:', error);
      },
    });
  }

  calculateCloseDiff(previous: number, current: number): string {
    const difference = current - previous;
    const percentageDiff = (difference / previous) * 100;

    return percentageDiff.toFixed(2) + '%';
  }

  formatDate(showTime = false, dateString?: string): string {
    const date = dateString ? new Date(dateString) : new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    if (!showTime) {
      return `${day}/${month}/${year}`;
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}h${minutes}`;
  }

  formatCurrency(value: number, maximumFractionDigits: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: maximumFractionDigits,
    }).format(value);
  }
}
