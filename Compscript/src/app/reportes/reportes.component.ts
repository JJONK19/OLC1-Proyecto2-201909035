import { Component, OnInit } from '@angular/core';
import { AnalizarService } from '../servicios/analizar.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  salidaE: Array<any> =  this.analizarService.getErrores();    
  salidaS: Array<any> =  this.analizarService.getSimbolos();     
  salidaM: Array<any> =  this.analizarService.getMetodos();
  constructor(private analizarService: AnalizarService) { }

  ngOnInit(): void {
    this.salidaE =  this.analizarService.getErrores(); 
    this.salidaS =  this.analizarService.getSimbolos();
    this.salidaM =  this.analizarService.getMetodos();
  }

}
