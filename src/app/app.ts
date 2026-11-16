import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected logIn = signal(false)

  changeLogIn(newValue: boolean): void {
   this.logIn.set(newValue) 
  }
}
