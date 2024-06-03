import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../_services/token-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FitnessProgramServiceService } from '../../_services/fitness-program-service.service';
import { Observable } from 'rxjs';
import { FeaturedWorkoutsService } from '../../_services/featured-workouts-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredWorkouts: any[] = [];
  bodyParts: string[] = [
    'back', 'cardio', 'chest', 'lower arms', 'lower legs',
    'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'
  ];
  fitnessPrograms$!: Observable<any>;
  selectedBodyPart: string = 'back'; // Default body part
  fitnessProgram: any; // Placeholder for fitness program data
  creatingProgram: boolean = false; // Flag to show/hide create program form
  newProgramName: string = ''; // Placeholder for new program name
  hoursPerWeek: number = 0; // Placeholder for hours per week
  daysPerWeek: number = 0; // Placeholder for days per week
  fitnessPrograms: any[] = []; // Placeholder for fitness program list
  selectedProgramId: string | null = null;
  userId: any;


  constructor(private http: HttpClient, private fitnessProgramService: FitnessProgramServiceService, private featuredWorkoutsService: FeaturedWorkoutsService, private router: Router, private tokenStorage: TokenStorageService) { }
  
  ngOnInit(): void {
    this.loadFeaturedWorkouts();
    this.userId = this.tokenStorage.getUserId();
  }



  loadFeaturedWorkouts(): void {
    this.featuredWorkoutsService.getFeaturedWorkouts(this.selectedBodyPart)
      .subscribe(
        (data: any) => {
          this.featuredWorkouts = data;
        },
        (error: any) => {
          console.log('Error fetching featured workouts:', error);
        }
      );
  }

  changeBodyPart(bodyPart: string): void {
    this.selectedBodyPart = bodyPart;
    this.loadFeaturedWorkouts();
  }

  

  createFitnessProgram(): void {
    this.creatingProgram = true; // Show create program form
  
     // Retrieve user ID from TokenStorageService

    const programData = {
      userId: this.userId,
      programName: this.newProgramName,
      bodyPart: this.selectedBodyPart,
      hoursPerWeek: this.hoursPerWeek,
      daysPerWeek: this.daysPerWeek
    };
  
    // this.http.post<any>('http://127.0.0.1:3000/fitness_program', programData)
    //   .subscribe((data: any) => {
    //     this.fitnessProgram = data;
    //     this.creatingProgram = true; // Hide create program form
    //     this.newProgramName = ''; // Clear input field
    //     this.hoursPerWeek = 0; // Reset hours per week
    //     this.daysPerWeek = 0; // Reset days per week
    //   });
  }
  

  saveFitnessProgram(): void {
    this.fitnessProgramService.createFitnessProgram(this.userId, this.newProgramName, this.selectedBodyPart, this.hoursPerWeek, this.daysPerWeek)
      .subscribe((data: any) => {
        this.fitnessProgram = data;
        this.creatingProgram = false; // Hide create program form
        this.newProgramName = ''; // Clear input field
        this.hoursPerWeek = 0; // Reset hours per week
        this.daysPerWeek = 0; // Reset days per week
      });
  }

 viewPrograms(): void {
    this.fitnessProgramService.getFitnessPrograms(this.userId)
      .subscribe(
        (programs: any[]) => {
          this.fitnessPrograms = programs;
        },
        (error: any) => {
          // Handle error if needed
        }
      );
  }
  
  
  loadFitnessPrograms(): void {
    this.router.navigate(['/fitness_program']);

  }

  
    
  
 

  deleteFitnessProgram(program: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this program?');
    if (confirmDelete) {
      this.fitnessProgramService.deleteFitnessProgram(program._id)
        .subscribe(
          () => {
            // Remove the program from the local list
            this.fitnessPrograms = this.fitnessPrograms.filter((p) => p._id !== program._id);
            alert('Program deleted successfully!');
          },
          (error: any) => {
            console.error('Error deleting program:', error);
            alert('Error deleting program. Please try again.');
          }
        );
    }
  }
}