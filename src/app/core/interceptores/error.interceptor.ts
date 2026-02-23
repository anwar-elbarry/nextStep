import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const alertService = inject(AlertService);
    const router = inject(Router);

    return next(req).pipe(
        catchError((error) => {
            let message: string;

            switch (error.status) {
                case 0:
                    message = 'Impossible de se connecter au serveur';
                    break;
                case 400:
                    message = 'Requête invalide';
                    break;
                case 401:
                    message = 'Session expirée, veuillez vous reconnecter';
                    router.navigate(['/login']);
                    break;
                case 403:
                    message = 'Accès refusé';
                    break;
                case 404:
                    message = 'Ressource introuvable';
                    break;
                case 409:
                    message = 'Conflit — la ressource existe déjà';
                    break;
                case 422:
                    message = 'Données invalides';
                    break;
                case 500:
                    message = 'Erreur interne du serveur';
                    break;
                case 503:
                    message = 'Service temporairement indisponible';
                    break;
                default:
                    message = 'Une erreur inattendue s\'est produite';
                    break;
            }

            alertService.error(message);

            return throwError(() => error);
        })
    );
};
