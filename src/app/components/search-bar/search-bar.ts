import { Component, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-search-bar',
  imports: [ToolbarModule, InputTextModule, SelectModule, FormsModule],
  templateUrl: './search-bar.html',
})
export class SearchBar {
  @Output() changeLogInEvent = new EventEmitter<boolean>();
  @Output() changeQueryEvent = new EventEmitter<string>();
  @Output() changeCategoryEvent = new EventEmitter<Category>();

  protected category = signal<Category>('Todos')
  protected query = signal<string>('')
  protected userTypes = [
    { name: 'Visitante (Sin Sesión)', value: false },
    { name: 'Comercio Registrado', value: true },
  ];
  protected Categories = ['Todos', 'Herramientas', 'Abrasivos', 'Plomería'];

  protected selectedUserType: boolean = false;


  changeLogIn(newValue: boolean): void {
    this.changeLogInEvent.emit(newValue);
  }

  onQueryChange(newQuery: string): void {
    this.query.set(newQuery)
    this.changeQueryEvent.emit(newQuery);
  }

  onCategoryChange(newCategory: Category): void {
    this.category.set(newCategory)
    this.changeCategoryEvent.emit(newCategory);
  }
}