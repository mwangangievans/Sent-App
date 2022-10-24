import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { parcel_interface, parcel_interface_response, userRegister } from 'src/app/interface/interface';
import { AuthService } from 'src/app/services/auth.service';
import { ParcelService } from 'src/app/services/parcel.service';


@Component({
  selector: 'app-update-parcel',
  templateUrl: './update-parcel.component.html',
  styleUrls: ['./update-parcel.component.css']
})
export class UpdateParcelComponent implements OnInit {
  UpdatedData!:FormGroup
  // formValue!:FormGroup
  allUsers: userRegister [] = [];
  isUpdating:boolean=false
  allParcels$!: Observable<parcel_interface_response>
  id:number = 0 ;

  // ===================
  // id:number = 0 ;
  // isUpdating:boolean=false
  // allParcels$!: Observable<parcel_interface_response>
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
 //  logitude!:number
 //  latitude!:number



  constructor(private router:Router ,private route:ActivatedRoute ,private parcel_service:ParcelService,private user:AuthService ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']
    this.updateParcel()
    this.user.getAllUsers().subscribe(res=>{
      this.allUsers=res})

      this.UpdatedData = new FormGroup({
        // name: new Form
        // Sender
        // Receiver
        // destination
        // time_Dispatched
        // status
      })

    // console.log("update"+this.id);
  }


  updateParcel(){
    this.allParcels$ = this.parcel_service.getOneParcels(+this.id)
  }
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 1.3836406165683048 , lng: 38.621918374999986
  };
  zoom = 6;
  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  handleSubmit(){

  }
  AddressChange(address:any){

  }

}
