import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private readonly env = (window as any).__env || {};

    get apiBaseUrl(): string {
        return this.env.API_BASE_URL || '';
    }
}