import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FitnessProgramServiceService {

  constructor(private http: HttpClient) { }

  createFitnessProgram(userId: any, programName: string, bodyPart: string, hoursPerWeek: number, daysPerWeek: number): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:3000/fitness_program', { userId, programName, bodyPart, hoursPerWeek, daysPerWeek });
  }

 
  getFitnessPrograms(userId: any): Observable<any[]> {
    return this.http.get<any[]>(`http://127.0.0.1:3000/fitness_program/${userId}`).pipe(
      catchError((error) => {
        console.error('Error loading fitness programs:', error);
        return throwError(error);
      })
    );
  }



  deleteFitnessProgram(programId: string): Observable<any> {
    return this.http.delete<any>(`http://127.0.0.1:3000/fitness_program/${programId}`);
  }
}
