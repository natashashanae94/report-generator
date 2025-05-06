import { Component, inject, OnInit} from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { collection, getDocs, Firestore } from "firebase/firestore";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {DialogBox} from './dialog-box/dialog-box.component'


interface Insight {
  value: string;
  viewValue: string;
}

interface Report {
  value: string;
  viewValue: string;
}

@Component({
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule,MatInputModule, MatDividerModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  postIds: string[] = [];

  constructor(private firestore: Firestore) {}

  //Logic that triggers the dialog box for +Add New Data button.
  title = 'new-data-dialog';
  readonly dialog = inject(MatDialog);
  openDialog(): void{
    this.dialog.open(DialogBox)
  }

  //Calling firestore to retrieve document data
  async ngOnInit() {
    const usersCollection = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersCollection);

    this.postIds = snapshot.docs.map(doc => doc.id)
  }


  //Example report type values for Select Dropdown component (I plan to replace these with API values).
  insights: Insight[] = [
    {value: 'lcp-0', viewValue: 'Largest Contentful Paint'},
    {value: 'fcp-1', viewValue: 'First Contentful Paint'},
    {value: 'cls-2', viewValue: 'Cumulative Layout Shift'},
    {value: 'performance-3', viewValue: 'Performance'},
    {value: 'accessibility-4', viewValue: 'Accessibility'},
    {value: 'best-practice-5', viewValue: 'Best Practice'},
    {value: 'seo-6', viewValue: 'SEO'},
    {value: 'speed-index-7', viewValue: 'Speed Index'},
    {value: 'tbt-8', viewValue: 'Total Blocking Time'},
    {value: 'transfer-size-9', viewValue: 'Page Transfer Size'},
    {value: 'num-requests-10', viewValue: 'Number of Requests'},
  ];

  //Example generated report values for Select Dropdown component (I plan to replace these with API values).
  reports: Report[] = [
    {value: 'consumer-lcp-desktop-before', viewValue: '3/15/23 @ 1:23PM EST Consumer - Contact http://www.penske.com/consumer/contact'},
    {value: 'consumer-lcp-desktop-after', viewValue: '4/15/25 @ 2:50PM EST Consumer - Contact http://www.penske.com/consumer/contact'},
  ];

}
