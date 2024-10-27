import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule],
})
export class AppComponent implements OnInit {
  // Stores the list of people fetched from the API
  people: any[] = [];

  // Stores the filtered list of people based on user input
  filteredPeople: any[] = [];

  // Controls the current page for pagination
  page = 1;

  constructor(private peopleService: PeopleService) { }

  // Initializes component by loading the first page of people
  ngOnInit() {
    this.loadPeople();
  }

  // Fetches a list of people from the service based on the current page
  loadPeople() {
    this.peopleService.getPeople(this.page).subscribe(
      (data) => {
        this.people = data;
        this.filteredPeople = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // Filters the list of people based on user input
  filter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value.toLowerCase();

    this.filteredPeople = this.people.filter(person =>
      person.name.toLowerCase().includes(filterValue)
    );
  }

  // Loads the next page of people and updates the list
  nextPage() {
    this.page++;
    this.loadPeople();
  }

  // Loads the previous page of people and updates the list, if not on the first page
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadPeople();
    }
  }
}
