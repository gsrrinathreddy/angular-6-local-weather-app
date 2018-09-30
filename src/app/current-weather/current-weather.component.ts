import { Component, OnInit } from '@angular/core'
import { ICurrentWeather } from './../interfaces'
import { WeatherService } from './../services/weather.service'
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather

  constructor(private weatherService: WeatherService) {
    this.current = {
      city: 'Hyderabad',
      country: 'India',
      date: new Date(),
      image: 'sunny',
      temperature: 27,
      description: 'sunny weather',
    } as ICurrentWeather
  }

  ngOnInit() {
    this.weatherService
      .getCurrentCityWeather('Sydney', 'AU')
      .subscribe(data => (this.current = data))
  }
}
