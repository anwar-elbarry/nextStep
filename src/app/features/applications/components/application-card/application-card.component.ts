import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { ApplicationModel } from '../../models/applicationResp.model';
import { ApplicationStatus } from '../../models/applicationStatus.enum';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-application-card',
    standalone: true,
    imports: [CommonModule, TimeAgoPipe, FormsModule],
    templateUrl: './application-card.component.html',
    styleUrl: './application-card.component.css'
})
export class ApplicationCardComponent {
    application = input.required<ApplicationModel>();

    @Output() statusChange = new EventEmitter<{ id: string; status: ApplicationStatus }>();
    @Output() notesChange = new EventEmitter<{ id: string; notes: string }>();
    @Output() delete = new EventEmitter<string>();

    ApplicationStatus = ApplicationStatus;
    isEditingNotes = false;
    editedNotes = '';

    statusBadgeClass = computed(() => {
        const status = this.application().status;
        switch (status) {
            case ApplicationStatus.PENDING:
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case ApplicationStatus.ACCEPTED:
                return 'bg-green-100 text-green-800 border-green-300';
            case ApplicationStatus.REJECTED:
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    });

    statusLabel = computed(() => {
        const status = this.application().status;
        switch (status) {
            case ApplicationStatus.PENDING:
                return 'Pending';
            case ApplicationStatus.ACCEPTED:
                return 'Accepted';
            case ApplicationStatus.REJECTED:
                return 'Rejected';
            default:
                return status;
        }
    });

    onStatusChange(newStatus: ApplicationStatus) {
        this.statusChange.emit({ id: this.application().id, status: newStatus });
    }

    startEditingNotes() {
        this.isEditingNotes = true;
        this.editedNotes = this.application().notes || '';
    }

    saveNotes() {
        this.notesChange.emit({ id: this.application().id, notes: this.editedNotes });
        this.isEditingNotes = false;
    }

    cancelEditNotes() {
        this.isEditingNotes = false;
        this.editedNotes = '';
    }

    onDelete() {
        if (confirm('Are you sure you want to delete this application?')) {
            this.delete.emit(this.application().id);
        }
    }
}
