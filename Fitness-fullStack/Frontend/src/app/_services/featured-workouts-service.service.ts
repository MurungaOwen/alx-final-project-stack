import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeaturedWorkoutsService {


  
  private apiUrl = 'http://localhost:3000/exercise/';

  constructor(private http: HttpClient, ) { }

  getFeaturedWorkouts(bodyPart: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${bodyPart}?limit=10`);
  }
}
