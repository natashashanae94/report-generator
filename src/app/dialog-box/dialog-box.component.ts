import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc} from '@angular/fire/firestore';
import { ApiService } from '../api.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-dialog-box',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss'
})
export class DialogBox { 
  //Calling API
  pageSpeedData: any;
  
  constructor(private apiService: ApiService) {}
  
    fetchPerformanceData(url: string): void {
      this.apiService.getPageSpeedData(url).subscribe(
        data => {

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

          console.log({
            performanceData: pagespeedData, 

            //Uncomment this statement to see the whole request JSON from API
            /* request: data*/
          }); 
          
        },
        error => {
          console.error('Error fetching PageSpeed data', error);
        }
      );
    }
}
