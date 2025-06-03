import { Component, inject, OnInit} from '@angular/core';
import { ApiService } from './services/api.service';
import {
  MatDialog,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {DialogBox} from './components/dialog-box/dialog-box.component'


interface Insight {
  value: string;
  viewValue: string;
}

interface Report {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatDividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {
  constructor(
    private apiService: ApiService
  ) {}

  websites: any[] = [];

  //Logic that triggers the dialog box for +Add New Data button.
  title = 'new-data-dialog';
  readonly dialog = inject(MatDialog);
  openDialog(): void{
    this.dialog.open(DialogBox)
  }
 
  insights: Insight[] = [
    {value: 'LCP', viewValue: 'Largest Contentful Paint'},
    {value: 'FCP', viewValue: 'First Contentful Paint'},
    {value: 'CLS', viewValue: 'Cumulative Layout Shift'},
    {value: 'Speed', viewValue: 'Speed Index'},
    {value: 'TBT', viewValue: 'Total Blocking Time'},
  ];

  ngOnInit() {
    this.apiService.getWebsiteID().subscribe((data: any) => {
      this.websites = data;
    });
  }

  // reports: Report[] = [
  //   {value: 'consumer-lcp-desktop-before', viewValue: '3/15/23 @ 1:23PM EST Consumer - Contact http://www.penske.com/consumer/contact'},
  //   {value: 'consumer-lcp-desktop-after', viewValue: '4/15/25 @ 2:50PM EST Consumer - Contact http://www.penske.com/consumer/contact'},
  // ];

}
