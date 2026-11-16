import { Component, EventEmitter, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [ToolbarModule, InputTextModule, SelectModule, FormsModule],
  templateUrl: './search-bar.html',
  styles: ``,
})
export class SearchBar {
  @Output() changeLogInEvent = new EventEmitter<boolean>() 
  protected userTypes = [
    {name:'Visitante (Sin Sesión)', value: false}, 
    {name:'Comercio Registrado', value: true }
  ]
  protected selectedUserType: boolean = false;

  changeLogIn(newValue: boolean) {
    this.changeLogInEvent.emit(newValue)
  }
}
