import { Component, signal } from '@angular/core';
import { Filter } from './models/Filter';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected logIn = signal(false)
  protected filter = signal<Filter>({
    query: 'string',
    categoria: ''
  })

  changeLogIn(newValue: boolean): void {
   this.logIn.set(newValue) 
  }

  changeFilter(newFilter: Filter): void {
    this.filter.set(newFilter)
  }
}
