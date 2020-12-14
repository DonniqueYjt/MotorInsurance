import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.singleroomsuites').slick();
      $('.leftsidebannerslider').slick({
        dots: false,
        arrows: false,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 2000,

      });

      $('.fadesliderhomebackground').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
      });

    });
    // Slick Slider
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

}
