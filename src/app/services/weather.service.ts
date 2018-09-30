import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from './../../environments/environment'
import { ICurrentWeather } from './../interfaces'

interface IcurrentWeatherData {
  weather: [
    {
      description: String
      icon: String
    }
  ]
  main: { temp: number }
  sys: {
    country: String
  }
  dt: number
  name: String
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getCurrentCityWeather(city: String, country: String): Observable<ICurrentWeather> {
    return this.httpClient
      .get<IcurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
          `q=${city},${country}&appid=${environment.appid}`
      )
      .pipe(map(data => this.transformToICurrentWeather(data)))
  }

  private transformToICurrentWeather(data: IcurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: new Date(),
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToCelcius(data.main.temp),
      description: data.weather[0].description,
    }
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67
  }

  private convertKelvinToCelcius(kelvin: number): number {
    return kelvin - 273
  }
}
