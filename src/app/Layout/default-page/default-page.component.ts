import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.scss']
})
export class DefaultPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var ReportUrl = "";
    
    if(localStorage.getItem("ReportUrl") != "" && localStorage.getItem("ReportUrl") != null)
    ReportUrl = localStorage.getItem("ReportUrl");
    localStorage.clear();
    
    if(ReportUrl != "")
    localStorage.setItem("ReportUrl", ReportUrl);
  }
}
