import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Equipment } from '../../interfaces/equipment.interface';

@Component({
  selector: 'app-equipment-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <div class="table-wrapper">
      <table mat-table [dataSource]="data()">
        
        <ng-container matColumnDef="codigo">
          <th mat-header-cell *matHeaderCellDef> Código </th>
          <td mat-cell *matCellDef="let element" class="font-bold"> {{element.codigo}} </td>
        </ng-container>

        <ng-container matColumnDef="cliente">
          <th mat-header-cell *matHeaderCellDef> Cliente </th>
          <td mat-cell *matCellDef="let element"> {{element.cliente}} </td>
        </ng-container>

        <ng-container matColumnDef="tipo">
          <th mat-header-cell *matHeaderCellDef> Tipo </th>
          <td mat-cell *matCellDef="let element"> {{element.tipo}} </td>
        </ng-container>

        <ng-container matColumnDef="estado">
          <th mat-header-cell *matHeaderCellDef> Estado </th>
          <td mat-cell *matCellDef="let element"> 
            <span class="status-badge" [class]="element.estado.toLowerCase()">
              {{element.estado}}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="fechaEntrega">
          <th mat-header-cell *matHeaderCellDef> Fecha Entrega </th>
          <td mat-cell *matCellDef="let element"> {{element.fechaEntrega | date:'dd/MM/yyyy'}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

        <tr class="mat-row" *matNoDataRow>
          <td class="mat-cell text-center p-4" colspan="5">
            No hay datos para mostrar.
          </td>
        </tr>
      </table>
    </div>
  `,
  styles: [`
    /* --- CONTENEDOR PRINCIPAL --- */
    .table-wrapper {
      width: 100%;
      overflow-x: auto; /* Activa el scroll horizontal */
      
      /* Estética del contenedor */
      background: white;
      border-radius: 8px;
      
      /* Sombra CSS personalizada (sutil y moderna) */
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                  0 2px 4px -1px rgba(0, 0, 0, 0.06);
      
      /* Opcional: Borde fino para mayor definición */
      border: 1px solid #e0e0e0;
    }

    /* --- TABLA --- */
    table {
      width: 100%;
      /* Forzamos un ancho mínimo para que aparezca el scroll en móviles */
      min-width: 800px; 
      padding: 0.5rem;
    }

    /* Estilos de badges */
    .status-badge {
      padding: 4px 8px; border-radius: 4px; font-weight: 500; font-size: 0.85rem;
      white-space: nowrap;
    }
    .alquilado { background-color: #e3f2fd; color: #1565c0; }
    .disponible { background-color: #e8f5e9; color: #2e7d32; }
    .mantenimiento { background-color: #fff3e0; color: #ef6c00; }
    
    /* Evitar que el texto de las celdas se rompa feo */
    td.mat-mdc-cell {
      white-space: nowrap;
      padding-right: 16px;
    }
  `]
})
export class EquipmentTableComponent {
  data = input.required<Equipment[]>();
  displayedColumns = ['codigo', 'cliente', 'tipo', 'estado', 'fechaEntrega'];
}