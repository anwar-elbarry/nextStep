import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-filter-job',
  imports: [],
  templateUrl: './search-filter-job.html',
  styleUrl: './search-filter-job.css',
})
export class SearchFilterJob {

  placeholder = input('Search...');
  countries = input<{code: string, name: string}[]>([]);
  
  onSearch = output<{ query: string, country: string }>();

  private selectedCountry = 'us';

  onCountryChange(code: string) {
    this.selectedCountry = code;
  }

  triggerSearch(query: string) {
    this.onSearch.emit({ 
      query: query.trim(), 
      country: this.selectedCountry 
    });
  }
  
}
