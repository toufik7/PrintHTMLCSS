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

  c = new Consultation();
  p = new Patient();
  id: any;
  username='Mc.Smith';
  certRegistred = false;
  certificat = new Certificat();
  dateCrt ='';
  dateP = '';

  constructor() {}

  ngOnInit(): void {
  }

  setPatient(){
    this.p.nom = 'connely'
    this.p.prenom = 'john'
    this.p.dateNaissance = '1992-12-03'
  }

  savepp(){
        //set patient
        this.setPatient();
        this.dateCrt = new Date();

        this.certRegistred = true;
    }
  }
