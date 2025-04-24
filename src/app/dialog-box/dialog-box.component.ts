import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { ApiService } from '../api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-dialog-box',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss'
})
export class DialogBox {

  //Calling API
  pageSpeedData: any;

  constructor(private apiService: ApiService, private firestore: Firestore) { }

  fetchPerformanceData(url: string): void {
    this.apiService.getPageSpeedData(url).subscribe({

      next: async (data) => {
        try {
          let pagespeedData = {
            id: data.id,
            timestamp: data.analysisUTCTimestamp,
            LCP: data.lighthouseResult.audits['largest-contentful-paint'].displayValue,
            FCP: data.lighthouseResult.audits['first-contentful-paint'].displayValue,
            CLS: data.lighthouseResult.audits['cumulative-layout-shift'].displayValue,
            TBT: data.lighthouseResult.audits['total-blocking-time'].displayValue,
            speed: data.lighthouseResult.audits['speed-index'].displayValue,
          }

          this.pageSpeedData = data;

          const colRef = collection(this.firestore, 'posts');
          const docRef = await addDoc(colRef, pagespeedData);
          console.log('Document written with ID:', docRef.id);
          // console.log({
          //   performanceData: pagespeedData,

          //   //Uncomment this statement to see the whole request JSON from API
          //   /* request: data*/
          // });

        } catch (error) {
          console.error('Firestore write error:', error);
        }
      },
      error: (err) => {
        console.error('Error fetching PageSpeed data', err);
      }
    });
}
}
