import { Component, OnInit } from '@angular/core';
import { AnalizarService } from '../servicios/analizar.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  salidaE: Array<any> =  this.analizarService.getErrores();     //Texto que se va amostrar en consola
  salidaS: Array<any> =  this.analizarService.getSimbolos();     //Texto que se va amostrar en consola
  constructor(private analizarService: AnalizarService) { }

  ngOnInit(): void {
    this.salidaE =  this.analizarService.getErrores(); 
    this.salidaS =  this.analizarService.getSimbolos();
  }

}
