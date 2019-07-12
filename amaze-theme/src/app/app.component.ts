import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})

export class AppComponent implements OnInit {
  
  /** called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit()
  {
    
    //jquery code
    $(document).ready(function () {
     
      //get sign in form class
      var signInForm = $(".sign-in-form");

      //get submit button class
      var submitButton = $(".submit-btn");

      //get id of user name field
      var userName = signInForm.find("#useName");

      //get id of password field
      var password = signInForm.find("#password");

      //id of error message for invalid username
      var userNameErrorMessage = $("#user-name-error-message");

      //id of error message for invalid password
      var passwordErrorMessage = $("#password-error-message");

      //if usernam and password field is empty then Boolean false
      var error_userName = false;
      var error_password = false;

      /*initially hide error messages of form fields*/
      userNameErrorMessage.hide();
      passwordErrorMessage.hide();

      var appHeaderLogo = $("div.app-menu").find(".app-header-logo");
      var appHeaderSignInBtn = $("div.app-menu").find(".app-header-sign-in-btn");

      
      //window view port width
      var windowWidth;

      //testimonial slider content
      var testimonialSliderContent = [
        {
          'testimonialImg': '../assets/testimonial.jpg',
          'testimonialDesc': `Bootstrap is an open source toolkit for developing with HTML, CSS, and JS.Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components`
        },
        {
          'testimonialImg': '../assets/testimonial-1.png',
          'testimonialDesc': `A testimonial slider shows the testimonial text submitted by your customers.The testimonies are presented in a beautiful, modern and mobile friendly way. `
        },
        {
          'testimonialImg': '../assets/testimonial-2.png',
          'testimonialDesc': `The html() method sets or returns the content (innerHTML) of the selected elements. When this method is used to return content, it returns the content of the FIRST matched element.`
        },
      ]

      //testimonial slider right arrow button
      var sliderRightBtn = $(".testimonial-slider-right-btn");

      //testimonial slider left arrow button
      var sliderLeftBtn = $(".testimonial-slider-left-btn");

      //index of the current testimonial slide
      var slideIndex = 1;


      //function call to get window width
      resize();

      //change top-header and bottom-menu background and menu suboptions position
      windowWidth = $(window).width();
      if (windowWidth >= 768) {
        //sub-option dropup/dropdown
        changePosition();
      }

      else {

        //remove dropup and dropdown class from suboptions
        $(".sub-option").removeClass("dropup-content").removeClass("dropdown-content");

        //for smaller screen menu will be fixed at top
        $("div.app-menu").addClass("fixed");
        $(".app-header").addClass("hide-element");
        appHeaderLogo.removeClass("hide-element");
        appHeaderSignInBtn.removeClass("hide-element");

        //remove header and menu styles 
        $(".app-header").css({ "background-color": "", "box-shadow": "" });
        $("div.app-menu").css({ "background-color": "", "box-shadow": "" });
        $(".sub-option").css({ "background-color": "" });

      }
    

      //function call to get window width on screen resize
      $(window).resize(function () {
        resize();
      });

      //function to calculate window width apll apply style accordingly
      function resize() {

        //width of window
        windowWidth = $(window).width();
       
       //if window width >= 768 (medium devices to extra large devices)
        if (windowWidth >= 768) {

          //when scroll top is at offset 100 then fix bottom menu at top
          fixMenuTop(100);


          //sub-option dropup/dropdown
          changePosition();
        }

        //if window width between 768 (small devices)
        else if (windowWidth < 768) {

          //when scroll top is at offset 80 then fix bottom menu at top
          fixMenuTop(80);

          //remove dropup and ropdown class from suboptions
          $(".sub-option").removeClass("dropup-content").removeClass("dropdown-content");

          //for smaller screen menu will be fixed at top
          $("div.app-menu").addClass("fixed");
          $(".app-header").addClass("hide-element");
          appHeaderLogo.removeClass("hide-element");
          appHeaderSignInBtn.removeClass("hide-element");

          //remove header and menu styles 
          $(".app-header").css({ "background-color": "", "box-shadow": "" });
          $("div.app-menu").css({ "background-color": "", "box-shadow": "" });
          $(".sub-option").css({ "background-color": "" });
        }

        else {
          fixMenuTop(40);
        }

      }
      
      /**fix bottm menu at top 
       * 
       * @param height of bottom menu
       */
      function fixMenuTop(height) {

       // var bottomMenuHeight = height;
        appHeaderLogo.addClass("hide-element");
        appHeaderSignInBtn.addClass("hide-element");

        //header and bottom menu position
        setPosition(height);

        $(window).scroll(function () {

          //header and bottom menu position
          setPosition(height);

          if (windowWidth >= 768) {
            //sub-option dropup/dropdown
            changePosition();

           
          }

          else {
            //remove dropup and dropdown class from suboptions
            $(".sub-option").removeClass("dropup-content").removeClass("dropdown-content");

            //for smaller screen menu will be fixed at top
            $("div.app-menu").addClass("fixed");
            $(".app-header").addClass("hide-element");
            appHeaderLogo.removeClass("hide-element");
            appHeaderSignInBtn.removeClass("hide-element");

            //remove header and menu styles 
            $(".app-header").css({ "background-color": "", "box-shadow": "" });
            $("div.app-menu").css({ "background-color": "", "box-shadow": "" });
            $(".sub-option").css({ "background-color": "" });
          }
          });

        }

      //change top-header and bottom-menu background and menu suboptions position
      function changePosition() {
       
      /*if scroll position > 50 then css to change header background color*/
        if ($(window).scrollTop() > 50) {
          $(".app-header").css({ "background-color": "#ffffff", "box-shadow": "0px 0px 1px grey" });
          $(".sub-option").css({ "background-color": "#ffffff" });
          $("div.app-menu").css({ "background-color": "#ffffff", "box-shadow": "0px 0px 1px grey"});
        }

        else {
          $(".app-header").css({ "background-color": "", "box-shadow": "" });
          $("div.app-menu").css({ "background-color": "", "box-shadow": "" });
          $(".sub-option").css({ "background-color": ""});
        }

        //if bellow space is not sufficient then disply suboptions upward
        if ($(window).scrollTop() >= 0 && $(window).scrollTop() <= 68) {
          //add dropup class  and remove dropdown class to suboptions
          $(".sub-option").addClass("dropup-content").removeClass("dropdown-content");
        }

        else {
           //remove dropup class  and add dropdown class to suboptions
          $(".sub-option").removeClass("dropup-content").addClass("dropdown-content");
        }

      }

      /**set header and bottom menu position
       * 
       * @param height of bottom menu
       */
      function setPosition(height) {

        //scroll height from top
        var scrollHeight = $(window).scrollTop();

        var navHeight = $(window).height() - height;
      
        //change top-header and bottom-menu position
        if (scrollHeight > navHeight) {  
          $("div.app-menu").addClass("fixed");
          $(".app-header").addClass("hide-element");
          appHeaderLogo.removeClass("hide-element");
          appHeaderSignInBtn.removeClass("hide-element");
        }

        else {
          $("div.app-menu").removeClass("fixed");
          appHeaderLogo.addClass("hide-element");
          appHeaderSignInBtn.addClass("hide-element");
          $(".app-header").removeClass("hide-element");
        }
      }
      
      /*open sign in popup on sign in button click*/
      $(".fa-sign-in").click(function () {
        $(".sign-in-modal").css("display", "block");
        //by default first input field is focused
        signInForm.find('input').first().focus();
       
      });

      $('.sign-in-modal').click( function (e) {

        //Check, whether click on modal-content or not
        if (e.target !== this) {
          return;
        }
          
        else {
          $(this).css("display", "none");
          userNameErrorMessage.hide();
          passwordErrorMessage.hide();
          $(signInForm).trigger('reset');
        }
        
      });

      
      /*sign in form validation*/

      //username feild validation
      userName.mouseleave(validateUserName).mouseenter(validateUserName);
     
      // password field validation
      password.mouseleave(validatePassword).mouseenter(validatePassword);

      //ON sign in submit submit button click
      submitButton.click(function () {
        validateUserName();
        validatePassword();

        /*if field validation is completed then error_password=error_userName=true and close sign in modal*/
        if (error_password && error_userName) {
          $(".sign-in-modal").css("display", "none");
          userNameErrorMessage.hide();
          passwordErrorMessage.hide();
          $(signInForm).trigger('reset');
        }
        
      });


      /*function call for user name  validation*/
      function validateUserName() {
        var userNameLength = userName.val().length;
        if (userNameLength == 0) {
          userNameErrorMessage.html("Please Enter User Name");
          userNameErrorMessage.show();
          error_password = false;
        }
        else {
          error_userName = true;
          userNameErrorMessage.hide();
        }
      }

      /*function call for password  validation*/
      function validatePassword() {
        var passwordLength = password.val().length;

       
        if (passwordLength >= 0 && passwordLength < 8) {
          passwordErrorMessage.html("Atleast 8 character required");
          passwordErrorMessage.show();
          error_password = false;
        }
        else {
          error_password = true;
          passwordErrorMessage.hide();

        }
      }
   
      //make list item active on click
      $(".menu-list li").click(function () {
        var selectedLink = $(this);
        var hasSubMenu = selectedLink.children(".sub-option");
       
        if (hasSubMenu.length == 0) {
          $(".menu-list li ").find("a").removeClass("active-link");
          $(".menu-list li ").children(".sub-option").css("display", "none");
          selectedLink.children("a").addClass("active-link");
        }

        else {
          selectedLink.children(".sub-option").css("display", "block");

          //sub-option and it's parent item will be active on click sub-option 
          $(".menu-list li").find(".sub-option li ").click(function (e) {
            var selectedSubOptionLink = $(this);
            $(".menu-list > li > a").removeClass("active-link");
            selectedLink.children("a").addClass("active-link");
            hasSubMenu.children("li a").removeClass("active-link"); 
            selectedSubOptionLink.children("a").addClass("active-link"); 
           
            
          });
 
        }
      });

      //close submenu when click outside the menu list
      $(document).on("click", function (event) {
        var $trigger = $(".menu-list");
        var $trigger1 = $(".app-menu");
        if (!$trigger.has(event.target).length) {
          $(".menu-list li ").children(".sub-option").css("display", "none");
        }     
      });


     //get testimonial slide content to display initially
      getSlideContent(slideIndex);

       //on click of slider right arrow button, disply next content
      sliderRightBtn.click(function () {

        //if current slide = last testimonial content, then start from first  content
        if (slideIndex == (testimonialSliderContent.length)) {
          slideIndex = 1;
          getSlideContent(slideIndex); 
        }
        else {
          getNextSlideIndex(1);
        }

      });

      //on click of slider left arrow button, disply previous content
      sliderLeftBtn.click(function () {

       //if current slide = first testimonial content, then start from last content
        if (slideIndex == 1) {
          slideIndex = testimonialSliderContent.length + 1;
          getNextSlideIndex(-1);
          
        }
        else {
          getNextSlideIndex(-1);
        }

      });


      /** get next slide index
      *
      * @param number is the +1(for next) or -1(for previous)
      **/
      function getNextSlideIndex(number) {
        slideIndex += number;
        getSlideContent(slideIndex);
      }

      /**get content to display in testimonial slide
        *
        * @param slideIndex is the current slide index
       **/
      function getSlideContent(slideIndex)
      {
        var currentIndexContent = testimonialSliderContent[slideIndex-1];
        $(".testimonial-description").html(currentIndexContent["testimonialDesc"]);
        $(".testimonial-description").attr("title", currentIndexContent['testimonialDesc']);
        $(".testimonial-image").attr("src", currentIndexContent['testimonialImg']);
      }

    });


   
    
  }

  
 
}
