import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url= environment.apiUrl;
  constructor(private httpClient:HttpClient) { }
  getDetails(){
    return this.httpClient.get(this.url+"/dashboard/details");
  }
}
