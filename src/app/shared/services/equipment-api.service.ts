import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Equipment, ValidationResponse } from '../interfaces/equipment.interface';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/equipos';

  getEquipments(): Promise<Equipment[]> {
    return firstValueFrom(this.http.get<Equipment[]>(this.apiUrl));
  }

  validateCodes(codigos: string[]): Promise<ValidationResponse> {
    return firstValueFrom(
      this.http.post<ValidationResponse>(`${this.apiUrl}/validar-equipos`, { codigos })
    );
  }
}