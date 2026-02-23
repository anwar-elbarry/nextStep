import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  currentPage = input<number>(1);
  totalPages = input<number | undefined>(undefined);
  totalElements = input<number>(0); // Total number of items
  hasMore = input<boolean>(true); // For simple next/prev mode
  pageChange = output<number>();

  // Fixed items per page
  readonly itemsPerPage = 10;

  // Expose Math to template
  readonly Math = Math;

  // Simple mode: only show next/prev without page numbers
  simpleMode = computed(() => this.totalPages() === undefined);

  // Computed signal to generate visible page numbers
  pages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: number[] = [];

    // If simple mode or no total, return empty array
    if (total === undefined) {
      return pages;
    }

    if (total <= 5) {
      // Show all pages if total is 5 or less
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate range around current page
      let start = Math.max(2, current - 1);
      let end = Math.min(total - 1, current + 1);

      // Adjust if we're near the beginning
      if (current <= 3) {
        start = 2;
        end = 4;
      }

      // Adjust if we're near the end
      if (current >= total - 2) {
        start = total - 3;
        end = total - 1;
      }

      // Add ellipsis before middle pages if needed
      if (start > 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle pages if needed
      if (end < total - 1) {
        pages.push(-2); // -2 represents ellipsis
      }

      // Always show last page
      pages.push(total);
    }

    return pages;
  });

  nextPage() {
    const current = this.currentPage();
    const total = this.totalPages();

    // In simple mode, check hasMore; in full mode, check against total
    if (this.simpleMode()) {
      if (this.hasMore()) {
        this.pageChange.emit(current + 1);
      }
    } else if (total !== undefined && current < total) {
      this.pageChange.emit(current + 1);
    }
  }

  prevPage() {
    const current = this.currentPage();
    if (current > 1) {
      this.pageChange.emit(current - 1);
    }
  }

  goToPage(page: number) {
    const total = this.totalPages();
    if (total !== undefined && page >= 1 && page <= total && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  isActivePage(page: number): boolean {
    return page === this.currentPage();
  }

  isEllipsis(page: number): boolean {
    return page < 0;
  }
}
