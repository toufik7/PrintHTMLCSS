import { Component, OnInit } from '@angular/core';
import { Certificat } from '../certificat';
import { Consultation } from '../class/consultation';
import { Patient } from '../class/patient';

@Component({
  selector: 'app-papier',
  templateUrl: './papier.component.html',
  styleUrls: ['./papier.component.css']
})
export class PapierComponent implements OnInit {

  certificat = new Certificat();
  p = new Patient();
  dateCrt = new Date();
  username='';

  constructor() {}

  ngOnInit(): void {
    this.setPatient();
    username='Mc.Smith';
  }

  setPatient(){
    this.p.nom = 'connely'
    this.p.prenom = 'john'
    this.p.dateNaissance = '1992-12-03'
  }
}
