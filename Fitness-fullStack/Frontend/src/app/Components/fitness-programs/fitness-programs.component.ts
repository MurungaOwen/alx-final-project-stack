import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TokenStorageService } from '../../_services/token-storage.service';
import { switchMap, catchError, Observable, throwError } from 'rxjs';
import { FitnessProgramServiceService } from '../../_services/fitness-program-service.service';


@Component({
  selector: 'app-fitness-programs',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './fitness-programs.component.html',
  styleUrl: './fitness-programs.component.css'
})
export class FitnessProgramsComponent implements OnInit {
  fitnessPrograms: any[] = [];
  editingProgram: any = null;
  items$!: Observable<any[]>;
  totalItemsCount$!: Observable<number>;
  userId: any;

  constructor(private http: HttpClient,   private fitnessProgramService: FitnessProgramServiceService, private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUserId();
    this.loadFitnessPrograms();
  }

  loadFitnessPrograms(): void {
    const url = `http://127.0.0.1:3000/fitness_program/${this.userId}`; // Adjusted port number
  
    this.items$ = this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error('Error loading fitness programs:', error);
        return throwError(error);
      })
    );
  }

  

  editProgram(program: any): void {
    this.editingProgram = program;
  }

  saveChanges(program: any): void {
    const programId = program._id;
    const url = `http://127.0.0.1:3000/fitness_program/${programId}`;

    this.http.put<any>(url, program).pipe(
      catchError((error) => {
        console.error('Error updating program:', error);
        return throwError(error);
      })
    ).subscribe(() => {
      console.log('Program updated successfully');
      this.loadFitnessPrograms(); // Reload programs to reflect changes
      this.editingProgram = true; // Reset editing mode
    });
  }

  deleteProgram(program: any): void {
    const programId = program._id;
    const url = `http://localhost:3000/fitness_program/${programId}`;

    this.http.delete<any>(url).pipe(
      catchError((error) => {
        console.error('Error deleting program:', error);
        return throwError(error);
      })
    ).subscribe(() => {
      console.log('Program deleted successfully');
      this.loadFitnessPrograms(); // Reload programs after deletion
    });
    }
  
  }