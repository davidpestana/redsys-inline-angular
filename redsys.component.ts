import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const REDSYS_DOMAIN = 'https://sis-t.redsys.es:25443';

@Component({
  selector: 'app-redsys',
  templateUrl: './redsys.component.html',
  styleUrls: ['./redsys.component.sass']
})
export class RedsysComponent implements OnInit {
  @Output() onError = new EventEmitter<string>();
  @Output() onSuccess = new EventEmitter<string>();


  @Input() orderId: string = Math.round(Math.random() * 10000).toString();
  @Input() language:string = "es";
  @Input() styleButton: string = "";
  @Input() styleBody: string = "";
  @Input() styleBox: string = "";
  @Input() styleBoxText: string = "";
  @Input() buttonValue: string = "Pay now";
  @Input() fuc: string = "999008881";
  @Input() terminal: string = "001";

  @ViewChild('iframe') iframe!:ElementRef;

  src: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(
      REDSYS_DOMAIN +'/sis/getInputNC?buttonValue='+this.toHex(this.buttonValue)+'&styleButton='+this.toHex(this.styleButton)+'&styleBody='+this.toHex(this.styleBody)+'&styleBox='+this.toHex(this.styleBox)+'&styleBoxText='+this.toHex(this.styleBoxText)+'&frame=inSite&fuc='+this.toHex(this.fuc)+'&terminal='+this.toHex(this.terminal)+'&order='+this.toHex(this.orderId)+'&version=V2'+'&idioma=' + this.toHex(this.language)
    );
  }

  ngOnInit(): void {

  }

  @HostListener('window:message',['$event'])
    receiveMessage(event:MessageEvent) {
      if(event.origin === REDSYS_DOMAIN && event.data === 'merchantValidation') {
        this.iframe.nativeElement.contentWindow.postMessage({'validation': 'OK'}, REDSYS_DOMAIN);
      }else{
        if(event.data.error) {
          this.onError.emit(event.data.error);
        }
        if(event.data.idOper) {
          this.onSuccess.emit(event.data.idOper);
        }
      }
    }

  ngAfterViewInit(): void {
    this.checkIframeLoaded();
  }

  checkIframeLoaded() {    
    setTimeout(() => this.iframe.nativeElement.contentWindow.postMessage('domain',REDSYS_DOMAIN),1000);
  }

  toHex(str:string) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
      hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
  }
}
