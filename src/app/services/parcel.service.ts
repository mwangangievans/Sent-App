import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { parcelMessage, parcel_interface, parcel_interface_response } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  constructor(private http: HttpClient,private router:Router,private route:ActivatedRoute) { }
  token= localStorage.getItem("token") as string

  addParcel(parcelData:parcel_interface):Observable<parcelMessage>{
    console.log(parcelData);
    return this.http.post<parcelMessage>('http://localhost:5000/parcel/create', parcelData)
  }

  markDelivered(id:number):Observable<parcelMessage>{
    console.log(id);
    return this.http.post<parcelMessage>(`http://localhost:5000/parcel/mark/${id}`, null)
    // {
    //   headers: new HttpHeaders({
    // token: this.token })
    //  }
    // )

  }

  softDeleteParcel(id:number):Observable<parcelMessage>{
    console.log(id);
    return this.http.delete<parcelMessage>(`http://localhost:5000/parcel/delete/${id}`)
    // {
    //   headers: new HttpHeaders({
    // token: this.token })
    //  }
    // )

  }

  getAllParcels():Observable<parcel_interface_response[]>{
    return this.http.get<parcel_interface_response[]>('http://localhost:5000/parcel/all-parcels',
    {
      headers: new HttpHeaders(
        {
        token: this.token
       })
    }
      ).pipe(map((res)=>{
        return res
      }))
  }

  getOneParcels(id:number):Observable<parcel_interface_response>{

    return this.http.get<parcel_interface_response>(`http://localhost:5000/parcel/show/${id}`,
     {
      headers: new HttpHeaders({
    token: this.token })
     }
    )
    // .pipe(map((res)=>{

    //   console.log("sigle user......"+res);

    //   return res
    // }))
  }
  redirect(url:string){
    this.router.navigate([url]);
  }



}
