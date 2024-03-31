import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { UserService } from '../user/user.service';
import { Credentials, FullUser, UserRequest } from 'src/app/shared/models';
import { Router } from '@angular/router';
import { CompanyService } from '../company/company.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //User login
  //Creates a new user
  private loginUrl = 'http://localhost:8080/users/login';
  private createUserUrl = 'http://localhost:8080/users';
  private createdUser = new BehaviorSubject<FullUser | null>(null);
  private userData = new BehaviorSubject<FullUser | null>(null);
  private currentUser: FullUser | null = null;
  private usersSubject = new BehaviorSubject<FullUser[] | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private companyService: CompanyService
  ) {}

  setCreatedUser(data: FullUser): void {
    this.createdUser.next(data);
  }

  getCreatedUser(): Observable<FullUser | null> {
    return this.createdUser.asObservable();
  }

  setUserData(data: FullUser): void {
    this.userData.next(data);
  }

  getUserData(): Observable<FullUser | null> {
    return this.userData.asObservable();
  }

  getCurrentUser(): FullUser | null {
    return this.currentUser;
  }

  setCurrentUser(user: FullUser | null): void {
    this.currentUser = user;
  }

  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/login']);
    console.log('userData', this.userData);
  }


  login(credentials: Credentials): Observable<FullUser> {
    return this.http.post<FullUser>(this.loginUrl, credentials).pipe(
      map((response) => {

        console.log('Login successful', response);
        this.setUserData(response);
        this.companyService.setCompanies(response.companies);
        this.companyService.setTeams(response.teams)
        this.setCurrentUser(response);
        return response;
      }),
      catchError((error) => {
        console.error('Login error', error);
        return throwError(error);
      })
    );
  }

  createUser(userData: UserRequest): Observable<FullUser> {
    return this.http.post<FullUser>(this.createUserUrl, userData).pipe(
      map((response) => {
        console.log('Create user successful', response);
       //add the user to the specific company - create backend endpont to add user to company
        this.setCreatedUser(response);
        return response;
      }),
      catchError((error) => {
        console.error('Login error', error);
        return throwError(error);
      })
    );
  }
}
