import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { parcel_interface, userRegister } from 'src/app/interface/interface';
import { AuthService } from 'src/app/services/auth.service';
import { ParcelService } from 'src/app/services/parcel.service';

@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.css']
})
export class AddParcelComponent implements OnInit {
  formValue!:FormGroup
 destination_address!:string
 allUsers: userRegister [] = [];

 lat!:string
 logi!:string
  // @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  title = 'rou';
  //Local Variable defined
  formattedaddress=" ";
  options = {
    types: ['address'],
    componentRestrictions: { country: ['ke'] }
    } as unknown as Options;

  parcel_status :string[]= ['cancelled','dispatched','delivered']
  constructor( private formbuider:FormBuilder, private parcel_auth:ParcelService ,private user:AuthService) { }

  ngOnInit(): void
   {
    this.user.getAllUsers().subscribe(res=>{
      this.allUsers=res})


    this.formValue = this.formbuider.group({
    //  'is_deleted': false,
    'parcel_no': Math.floor(Math.random() * 1000000000),
    'Sender': this.formbuider.control('', Validators.required),
    'Receiver': this.formbuider.control('', Validators.required),
    'destination': this.formbuider.control(this.destination_address, Validators.required),
    'lat': this.formbuider.control(this.lat, Validators.required),
    'logi': this.formbuider.control(this.logi, Validators.required),
    'weight': this.formbuider.control('', Validators.required),
    'Cost': this.formbuider.control('', Validators.required),
    'time_Dispatched': this.formbuider.control('', Validators.required)

  });

  this.formValue.get('weight')?.valueChanges.subscribe((res)=>{
    this.formValue.get('Cost')!.setValue(res * 19);
  })

 }


  handleSubmit(){

    console.log(this.formValue);

      const ParcelData={...this.formValue.value,
        destination:this.destination_address,
        lat:this.lat,
        logi:this.logi,
        is_deleted:false,
        is_dispatched :true,
        is_delived:false,
        dispatch_notify:false,
        deliverde_notify:false
      }

      console.log(ParcelData);
      console.log(ParcelData.lat);


    this.parcel_auth.addParcel(ParcelData).subscribe(res=>{
    })
    setTimeout(() => {
      this.parcel_auth.redirect('admin/Percels')
       }, 500);
    }

  public AddressChange(address: any) {
    // console.log(address);

    console.log(address.name);


  this.destination_address = address.name
  this.lat = address.geometry.location.lat();
  this.logi = address.geometry.location.lng();

  }

}
