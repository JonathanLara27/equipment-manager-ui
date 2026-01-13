export interface Equipment {
    id: number;
    codigo: string;
    tipo: string;
    cliente: string;
    estado: string;
    fechaEntrega?: string;
  }
  
  export interface ValidationResponse {
    encontrados: string[];
    no_encontrados: string[];
  }