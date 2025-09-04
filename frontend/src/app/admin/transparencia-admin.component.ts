import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Transparencia {
    id?: number;
    titulo: string;
    descricao: string;
    data: string;
    postImagemId?: number;
}

@Component({
    selector: 'app-transparencia-admin',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './transparencia-admin.html'
})
export class TransparenciaAdminComponent implements OnInit {
    registros: Transparencia[] = [];
    novoRegistro: Transparencia = { titulo: '', descricao: '', data: '', postImagemId: undefined };

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.carregarRegistros();
    }

    carregarRegistros() {
        this.http.get<Transparencia[]>('/api/transparencia').subscribe(data => this.registros = data);
    }

    salvarRegistro() {
        this.http.post<Transparencia>('/api/transparencia', this.novoRegistro).subscribe(() => {
            this.novoRegistro = { titulo: '', descricao: '', data: '', postImagemId: undefined };
            this.carregarRegistros();
        });
    }

    deletarRegistro(id: number) {
        this.http.delete(`/api/transparencia/${id}`).subscribe(() => this.carregarRegistros());
    }
}
