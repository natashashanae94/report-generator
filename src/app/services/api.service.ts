import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';


interface URL {
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiKey: string = environment.pagespeedAPIKey;
  private apiUrl: string = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  private firestore =  inject(Firestore);

  constructor(
    private http: HttpClient,
  ) { }

  //Retrieves pagespeed data from api to be stored into firebase.
  getPageSpeedData(url: string): Observable<any> {
    const params = new HttpParams()
      .set('url', url)
      .set('key', this.apiKey);

    return this.http.get(this.apiUrl, { params });
  }

  //Gets website ids from firestore to be displayed in select dropdown.
  getWebsiteID(): Observable<any[]> {
    const col = collection(this.firestore, 'posts');
    return collectionData(col, {idField: 'id'});
  }
}
