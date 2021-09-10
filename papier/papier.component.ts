import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Certificat } from '../certificat';
import { Consultation } from '../class/consultation';
import { ExamenClinique } from '../class/examen-clinique';
import { Patient } from '../class/patient';
import { User } from '../class/user';
import { ConsultationService } from '../consultation.service';
import { Ordonnance } from '../ordonnance';
import { Oriantation } from '../oriantation';
import { PaperService } from '../paper.service';
import { AuthService } from '../services/auth.service';
import { DossierMedicalService } from '../services/dossier-medical.service';

@Component({
  selector: 'app-papier',
  templateUrl: './papier.component.html',
  styleUrls: ['./papier.component.css']
})
export class PapierComponent implements OnInit {

  c = new Consultation();
  ec = new ExamenClinique();
  p = new Patient();
  id: any;
  username='';
  currentUser = new User();
  certRegistred = false;
  ordRegistred = false;

  step='';
  certificat = new Certificat();
  ord = new  Ordonnance;
  ori = new  Oriantation;
  dateOrd ='';
  dateP = '';

  state='';

  constructor(private paperService: PaperService, private activatedRoute: ActivatedRoute, private cService: ConsultationService,
    private authService: AuthService, private dmService: DossierMedicalService) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idc;
    this.step = this.activatedRoute.snapshot.params.step;
    this.getUserByUsername()
    this.getC();
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      (res : User) =>{
        this.currentUser = res;
      });
    }

  getC(){
    this.cService.getCById(this.id).subscribe(
      (res: Consultation )=>{
        this.c = res;
        // get ec by ec.Id
        this.cService.getExamenCliniqueById(this.c.ecId).subscribe(
          (res: ExamenClinique)=>{
            this.ec = res;
            if(this.ec.certificat != null){
              this.certRegistred = true;
              this.getCertificat(this.ec.certificat)
            }
            this.getPatientByDMId(this.c.dm.id);
          }
        )
      })
  }

  getPatientByDMId(idDM){
    this.dmService.getPatientByDMId(idDM).subscribe(
      (res: Patient)=>{
        this.p = res;
        this.dateP = this.p.dateNaissance.toString().substring(0,10);
      })
  }

  recieveMsg($event){
    this.state = $event;
  }

  onNotified(msg: string){
    if(msg=='certificat'){
      this.step="33";
      console.log('certificat')
      this.certificat = new Certificat();
      if(this.ec.certificat != null){
        this.certRegistred = true;
        this.getCertificat(this.ec.certificat);
      }
    }else if(msg=='ordonnance'){
      this.step="331";
      console.log('ordonnance')
      this.ord = new Ordonnance();
      if(this.ec.ordonnance != null){
        this.ordRegistred = true;
        this.getOrd(this.ec.ordonnance);
      }
    }else if(msg=='oriantation'){
      this.step="332";
      console.log('ori')
      this.ori = new Oriantation();
      this.getOri();
    }
  }

  getCertificat(res){
    this.certificat = res;
    this.dateOrd = this.certificat.createDate.toString().substring(0,10);
  }
  getOrd(res){
    this.ord = res;
    this.dateOrd = this.ord.createDate.toString().substring(0,10);
  }
  getOri(){

  }


   // add new paper(certificat, ...)
  savepp(){
    switch(this.step){
      case "33": {// certificat
        this.certificat.doctor = this.currentUser.username;
        //get patient
        this.certificat.patient = this.p.nom;
        this.certificat.patientBD = this.p.dateNaissance.toString();

        this.paperService.addCertificat(this.ec.id, this.certificat).subscribe(
          (res: Certificat)=>{
            //auto update ExamenClinique
            alert("Certificat Enregistré avec succee");
            this.getCertificat(res);
            this.certRegistred = true;
          }
        )
        break;
      }
      case "331": {// Ordonnance
        this.ord.doctor = this.currentUser.username;
        //get patient
        this.ord.patient = this.p.nom;


        this.paperService.addOrdonnance(this.ec.id, this.ord).subscribe(
          (res: Ordonnance)=>{
            //auto update ExamenClinique
            alert("Ordonnance Enregistré avec succee");
            this.getOrd(res);
            this.ordRegistred = true;
          }
        )
        break;
     }
      default: {
        alert("Veuiller refraichir la page");
         break;
      }
    }
  }

  isCertificat(){
    return this.step=="33";
  }
  isOrd(){
    return this.step=="331";
  }
  isOriantation(){
    return this.step=="332";
  }


}
