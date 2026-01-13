import { Injectable, inject, resource, signal, computed } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipmentService } from './equipment-api.service';
import { Equipment } from '../interfaces/equipment.interface';

@Injectable()
export class EquipmentLogicService {
  private equipmentService = inject(EquipmentService);
  private snackBar = inject(MatSnackBar);

  readonly equipmentResource = resource({
    loader: () => this.equipmentService.getEquipments()
  });

  readonly pastedCodes = signal(''); 
  readonly validatedIds = signal<string[] | null>(null);
  readonly isValidating = signal(false);

  readonly viewData = computed(() => {
    const all = this.equipmentResource.value() as Equipment[] || [];
    const validIds = this.validatedIds();

    if (validIds === null) return all;

    return all.filter(eq => validIds.includes(eq.codigo));
  });

  updatePastedCodes(text: string) {
    this.pastedCodes.set(text);
  }

  async validateCurrentCodes() {
    const text = this.pastedCodes().trim();
    
    if (!text) {
      this.clearFilter();
      return;
    }

    this.isValidating.set(true);
    const codesArray = text.split('\n').map((c : string) => c.trim()).filter(Boolean);

    try {
      const response = await this.equipmentService.validateCodes(codesArray);

      this.validatedIds.set(response.encontrados);

      if (response.no_encontrados.length > 0) {
        this.snackBar.open(
          `⚠️ No encontrados: ${response.no_encontrados.join(', ')}`, 
          'Cerrar', 
          { duration: 8000, panelClass: 'error-snackbar' }
        );
      } else {
        this.snackBar.open('✅ Todos los equipos validados correctamente', 'OK', { duration: 3000 });
      }

    } catch (error) {
      console.error(error);
      this.snackBar.open('Error de conexión con el servidor', 'Cerrar');
    } finally {
      this.isValidating.set(false);
    }
  }

  clearFilter() {
    this.pastedCodes.set('');
    this.validatedIds.set(null);
    this.equipmentResource.reload();
  }
}