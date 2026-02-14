import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Alert, AlertType } from '../models/alert.model';
import { AlertActions } from '../store/actions/alert.actions';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private store = inject(Store);

    private showAlert(type: AlertType, message: string, duration: number = 3000) {
        const alert: Alert = {
            id: this.generateId(),
            type,
            message,
            duration
        };

        this.store.dispatch(AlertActions.showAlert({ alert }));

        // Auto-dismiss after duration
        if (duration > 0) {
            setTimeout(() => {
                this.store.dispatch(AlertActions.dismissAlert({ id: alert.id }));
            }, duration);
        }
    }

    success(message: string, duration?: number) {
        this.showAlert('success', message, duration);
    }

    error(message: string, duration?: number) {
        this.showAlert('error', message, duration);
    }

    warning(message: string, duration?: number) {
        this.showAlert('warning', message, duration);
    }

    info(message: string, duration?: number) {
        this.showAlert('info', message, duration);
    }

    dismiss(id: string) {
        this.store.dispatch(AlertActions.dismissAlert({ id }));
    }

    clearAll() {
        this.store.dispatch(AlertActions.clearAllAlerts());
    }

    private generateId(): string {
        return `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}
