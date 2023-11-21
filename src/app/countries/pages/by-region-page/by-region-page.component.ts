import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{
  constructor(private countriesService:CountriesService){}


  public regions:Country[] = [];
  public isLoading:boolean = false;
  public regionsArray:Region[] = ['Africa','Americas','Asia','Europe','Oceania'];
  public selectedRegion?:Region;

  ngOnInit(): void {
    this.regions = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(term:Region):void{
    this.selectedRegion = term;
    this.isLoading = true;
    this.countriesService.searchRegion(term).subscribe( region =>{
      this.regions = region;
      this.isLoading = false;
    })
  }
}
