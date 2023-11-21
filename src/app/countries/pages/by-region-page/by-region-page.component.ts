import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

type Region = 'Africa'|'Americas'|'Asia'|'Europe'|'Oceania'

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  constructor(private countriesService:CountriesService){}

  public regions:Country[] = [];
  public isLoading:boolean = false;
  public regionsArray:Region[] = ['Africa','Americas','Asia','Europe','Oceania'];
  public selectedRegion?:Region;

  searchByRegion(term:Region):void{
    this.selectedRegion = term;
    this.isLoading = true;
    this.countriesService.searchRegion(term).subscribe( region =>{
      this.regions = region;
      this.isLoading = false;
    })
  }
}
