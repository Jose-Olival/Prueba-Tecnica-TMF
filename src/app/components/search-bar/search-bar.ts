import { Component } from '@angular/core';
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
  protected userTypes = [
    {name:'Visitante (Sin Sesión)', value: false}, 
    {name:'Comercio Registrado', value: true }
  ]
  protected selectedUserType: boolean = false;
}
