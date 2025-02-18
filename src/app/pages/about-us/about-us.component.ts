import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  iframeSrc: SafeResourceUrl; // Use SafeResourceUrl for sanitized iframe URLs

  constructor(private sanitizer: DomSanitizer) { 
    // Default iframe source for Ludhiana
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.7362470247303!2d75.8206015753214!3d30.894038574506798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a83ceecb71813%3A0x4d88a1265ec53df8!2sSingla%20Slimming%20Clinic!5e0!3m2!1sen!2sin!4v1685096466393!5m2!1sen!2sin"
    );
  }

  ngOnInit(): void {}

  // Method to change the iframe source based on the location clicked
  changeLocation(location: string): void {
    let newIframeSrc = '';

    switch(location) {
      case 'LUDHIANA':
        newIframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d872590.5328929112!2d74.36157277812501!3d31.31599340000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a83ceecb71813%3A0x4d88a1265ec53df8!2sSingla%20Slimming%20Clinic%3A%20Weight%20Loss%20Clinic!5e0!3m2!1sen!2sca!4v1739867189642!5m2!1sen!2sca";
        break;
      case 'JALANDHAR':
        newIframeSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.5508095679825!2d75.5785082753004!3d31.31615805720361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5bfe544e6bcb%3A0x9d0fc0e206360b23!2sMKC%20Mall!5e0!3m2!1sen!2sin!4v1739870638698!5m2!1sen!2sin";
        break;
      case 'ZIRAKPUR':
        newIframeSrc = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3432.8583882507537!2d76.81409578147195!3d30.63794832481166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM4JzE2LjYiTiA3NsKwNDknMDguMyJF!5e0!3m2!1sen!2sin!4v1739867835870!5m2!1sen!2sin";
        break;
      case 'MOHALI':
        newIframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109748.5657591985!2d76.4362851736922!3d30.728444147448787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feffcc02abd41%3A0xed52846db25d8da4!2sPlaza%20117!5e0!3m2!1sen!2sin!4v1739867926515!5m2!1sen!2sin";
        break;
      case 'AMRITSAR':
        newIframeSrc = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3396.0818946887266!2d74.85143567531347!3d31.658979140281442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDM5JzMyLjMiTiA3NMKwNTEnMTQuNCJF!5e0!3m2!1sen!2sin!4v1739867102895!5m2!1sen!2sin";
        break;
      default:
        break;
    }

    // Sanitize and update the iframe source URL
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(newIframeSrc);
  }
}
