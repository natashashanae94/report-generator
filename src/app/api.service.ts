import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment.development';


interface URL {
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiKey: string = environment.pagespeedAPIKEY;
  private apiUrl: string = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

  constructor(private http: HttpClient) { }

  getPageSpeedData(url: string): Observable<any> {
    const params = new HttpParams()
      .set('url', url)
      .set('key', this.apiKey);

    return this.http.get(this.apiUrl, { params });
    
  }

}
