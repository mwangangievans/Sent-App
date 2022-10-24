import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { count, map } from 'rxjs';
import { parcel_interface, parcel_interface_response } from 'src/app/interface/interface';
import { ParcelService } from 'src/app/services/parcel.service';
import { ViewDetailDialogComponent } from '../view-detail-dialog/view-detail-dialog.component';

@Component({
  selector: 'app-percels',
  templateUrl: './percels.component.html',
  styleUrls: ['./percels.component.css']
})
export class PercelsComponent implements OnInit {

  allParcels: parcel_interface_response [] = [];
  totalParcelCount! : number;
  filteredString:string='';
  revenue:number = 0
  summArray:number []=[]

  constructor( private parcel_service:ParcelService ) { }

  ngOnInit(): void {

    this.parcel_service.getAllParcels().subscribe(res=>{
      this.allParcels=res

      res.forEach(item=>{
      this.summArray.push(item.total_cost)



      })
      const  partialSum =0
      this.revenue= this.summArray.reduce((partialSum , a) => partialSum + a, 0);
      // console.log(
      //   [1, 2, 3, 4].reduce((a, b) => a + b, 0)
      // )

      // console.log(sum);

      // console.log(this.summArray);


    })
    this.totalParcels()


  }



  totalParcels(){
    this.parcel_service.getAllParcels().subscribe(res=>{
      const  parcelCount = res.length;
      this.totalParcelCount = parcelCount


    })
  }
  viewDetails(parcelNo:number): void {

      this.parcel_service.redirect('admin/See-More/'+parcelNo)
  }
}
