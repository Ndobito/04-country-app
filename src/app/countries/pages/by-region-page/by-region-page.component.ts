import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  constructor(private countriesService:CountriesService){}

  public regions:Country[] = [];

  searchByRegion(term:string):void{
    this.countriesService.searchRegion(term).subscribe( region =>{
      this.regions = region;
    })
  }
}
