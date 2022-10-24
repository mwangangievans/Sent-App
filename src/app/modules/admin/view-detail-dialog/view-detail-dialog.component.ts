import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { Observable } from 'rxjs';
import { parcel_interface, parcel_interface_response, userRegister } from 'src/app/interface/interface';
import { ParcelService } from 'src/app/services/parcel.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-view-detail-dialog',
  templateUrl: './view-detail-dialog.component.html',
  styleUrls: ['./view-detail-dialog.component.css']
})


export class ViewDetailDialogComponent implements OnInit {
   id:number = 0 ;
   isUpdating:boolean=false;
   message:string = ''
   allParcels$!: Observable<parcel_interface_response>
   markerOptions: google.maps.MarkerOptions = {draggable: false};
   markerPositions: google.maps.LatLngLiteral[] = [];
   allUsers: userRegister [] = [];
   destination_address!:string
  lat!:string
  logi!:string




  constructor(private router:Router ,private route:ActivatedRoute ,private parcel_service:ParcelService ,private user:AuthService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']

    this.allParcels$=this.parcel_service.getOneParcels(+this.id)
    this.user.getAllUsers().subscribe(res=>{
      this.allUsers=res})
    this.allParcels$.subscribe(data=>{
      console.log("data..............."+data);

      // this.logitude=data.logitude
      // this.latitude=data.latitude
      // this.logitude=data.logitude
      // this.latitude=data.latitude
      console.log("lati..............."+data.latitude);


      this.markerPositions.push({ lat: parseFloat(data.latitude) , lng: parseFloat( data.logitude)});

    }

    )

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


//  ===================================================update logic==========================
Update(id:number){
  console.log(id);
}

updateParcel(id:number){
  console.log(id);
  this.router.navigate(['admin/update-Parcel/'+id])

}

markDelivered(id:number){
// console.log(id);
 this.parcel_service.markDelivered(id).subscribe({
  next: (data) => {
    this.message  = data.message;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  },

  error:(error)=> console.log(error),

  complete:() => console.log("complete updating the parcel"),

 })
}
softDelete(id:number){
  this.parcel_service.softDeleteParcel(id).subscribe({
    next:(data)=>{
      this.message =  data.message;
      console.log(this.message);


    },
    error:(error)=>{
      console.log(error);


    },
    complete:()=>{
      console.log("completing....");
      this.parcel_service.redirect('admin/Percels')
    }
  })

}
}
