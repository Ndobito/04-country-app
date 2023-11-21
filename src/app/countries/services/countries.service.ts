import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  constructor(private http: HttpClient) {
    this.loadToLocalStorage()
  }

  private getCountriesrequest(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([]))
      );
  }

  private apiUrl:string = 'https://restcountries.com/v3.1';

  public cacheStore:CacheStore = {
    byCapital:    {term: '', countries: []},
    byCountries:  {term: '', countries: []},
    byRegion:     {region: '', countries: []},
  }

  searchCountryByAlphaCode(code:string):Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError( () => of(null)),
      );
  }

  searchCapital(term:string):Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesrequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {term, countries}),
        tap(() => this.saveToLocalStorage())
      )
  }

  searchCountry(country:string):Observable<Country[]>{
    const url = `${this.apiUrl}/name/${country}`;
    return this.getCountriesrequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries= {term: country, countries}),
        tap(() => this.saveToLocalStorage())
      )
  }

  searchRegion(region:Region):Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesrequest(url)
      .pipe(
        tap(regions => this.cacheStore.byRegion = {region: region, countries: regions}),
        tap(() => this.saveToLocalStorage())
      )
  }

  private saveToLocalStorage():void{
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadToLocalStorage():void{
    if(!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

}
