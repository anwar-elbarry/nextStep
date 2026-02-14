import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllAlerts } from '../../../core/store/selectors/alert.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { AlertService } from '../../../core/services/alert.service';
import { Alert } from '../../../core/models/alert.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alert',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css'
})
export class AlertComponent {
    private store = inject(Store);
    private alertService = inject(AlertService);

    alerts = toSignal(this.store.select(selectAllAlerts), { initialValue: [] });

    dismiss(id: string) {
        this.alertService.dismiss(id);
    }

    getAlertClasses(type: string): string {
        const baseClasses = 'flex items-center p-4 mb-4 rounded-xl text-sm border';

        switch (type) {
            case 'success':
                return `${baseClasses} border-emerald-400 bg-emerald-50 text-emerald-500`;
            case 'error':
                return `${baseClasses} border-red-400 bg-red-50 text-red-500`;
            case 'warning':
                return `${baseClasses} border-yellow-400 bg-yellow-50 text-yellow-600`;
            case 'info':
                return `${baseClasses} border-blue-400 bg-blue-50 text-blue-500`;
            default:
                return baseClasses;
        }
    }

    getAlertIcon(type: string): { path: string; stroke: string } {
        switch (type) {
            case 'success':
                return {
                    path: 'M10.0043 13.3333V9.16663M9.99984 6.66663H10.0073M9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333Z',
                    stroke: '#10B981'
                };
            case 'error':
                return {
                    path: 'M10 13.3333V9.16663M10 6.66663H10.0083M10 18.3333C5.39763 18.3333 1.66667 14.6023 1.66667 9.99996C1.66667 5.39759 5.39763 1.66663 10 1.66663C14.6024 1.66663 18.3333 5.39759 18.3333 9.99996C18.3333 14.6023 14.6024 18.3333 10 18.3333Z',
                    stroke: '#EF4444'
                };
            case 'warning':
                return {
                    path: 'M10 13.3333V9.16663M10 6.66663H10.0083M10 18.3333C5.39763 18.3333 1.66667 14.6023 1.66667 9.99996C1.66667 5.39759 5.39763 1.66663 10 1.66663C14.6024 1.66663 18.3333 5.39759 18.3333 9.99996C18.3333 14.6023 14.6024 18.3333 10 18.3333Z',
                    stroke: '#F59E0B'
                };
            case 'info':
                return {
                    path: 'M10 13.3333V9.16663M10 6.66663H10.0083M10 18.3333C5.39763 18.3333 1.66667 14.6023 1.66667 9.99996C1.66667 5.39759 5.39763 1.66663 10 1.66663C14.6024 1.66663 18.3333 5.39759 18.3333 9.99996C18.3333 14.6023 14.6024 18.3333 10 18.3333Z',
                    stroke: '#3B82F6'
                };
            default:
                return {
                    path: '',
                    stroke: '#000000'
                };
        }
    }

    getAlertLabel(type: string): string {
        switch (type) {
            case 'success':
                return 'Success';
            case 'error':
                return 'Error';
            case 'warning':
                return 'Warning';
            case 'info':
                return 'Info';
            default:
                return '';
        }
    }
}
