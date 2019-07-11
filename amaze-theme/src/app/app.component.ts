import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener} from '@angular/core';
import * as $ from 'jquery';
import { empty } from 'rxjs';
import { error } from 'util';

/** array properties for menu item
 * @param id for identification of item using number
 * @param name for display name of the menu item*/
interface menuItem
{
  id: number;
  name: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})


export class AppComponent implements OnInit {

  //instance of the menuItem interface 
  menuItems: menuItem[];

  //get selected item from menu
  selectedItem: string ="home";

  
  /** called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit()
  {
    
    
    //menu item id,name,value
    this.menuItems =
      [
      { id: 1, name:"home" },
      { id: 2, name:"about" },
      { id: 3, name:"services" },
      { id: 4, name:"portfolio" },
      { id: 5, name:"team"},
      { id: 6, name: "pricing" },
      { id: 7, name: "contact" }
      ];

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

        $("div.app-menu").addClass("fixed");
        $(".app-header").addClass("hide-element");
        appHeaderLogo.removeClass("hide-element");
        appHeaderSignInBtn.removeClass("hide-element");

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

          //remove dropup and dropdown class from suboptions
          $(".sub-option").removeClass("dropup-content").removeClass("dropdown-content");

          $("div.app-menu").addClass("fixed");
          $(".app-header").addClass("hide-element");
          appHeaderLogo.removeClass("hide-element");
          appHeaderSignInBtn.removeClass("hide-element");

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
            //remove dropup and ropdown class from suboptions
            $(".sub-option").removeClass("dropup-content").removeClass("dropdown-content");

            $("div.app-menu").addClass("fixed");
            $(".app-header").addClass("hide-element");
            appHeaderLogo.removeClass("hide-element");
            appHeaderSignInBtn.removeClass("hide-element");

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
        }
        $(signInForm).trigger('reset');
      });

      /*function call for user name  validation*/
      function validateUserName() {
        var userNameLength = userName.val().length;
        if (userNameLength == 0) {
          userNameErrorMessage.html("Please Enter User Name");
          userNameErrorMessage.show();
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
        }
        else {
          error_password = true;
          passwordErrorMessage.hide();

        }
      }
   
      //make list item active on click
      $(".menu-list li").click(function () {
        var hasSubMenu = $(this).children(".sub-option");
        //$("button.navbar-toggler").attr("aria-expanded", "true");
       
        if (hasSubMenu.length == 0) {
          $(".menu-list li ").find("a").removeClass("active-link");
          $(".menu-list li ").children(".sub-option").css("display", "none");
          $(this).children("a").addClass("active-link");
         
        }

        else {
          $(this).children(".sub-option").css("display", "block");

          $(".menu-list > li > a").removeClass("active-link");
          $(this).children("a").addClass("active-link");

          $(".menu-list li").find(".sub-option li ").click(function (e) {

            hasSubMenu.children("li a").removeClass("active-link"); 
            $(this).children("a").addClass("active-link"); 
           
            
          });
 
        }
      });

      //close submenu when click outside the menu list
      $(document).on("click", function (event) {
        var $trigger = $(".menu-list");
        if (!$trigger.has(event.target).length) {
          $(".menu-list li ").children(".sub-option").css("display", "none");
       
        }

        else {
         
        }

        
      });

    });


   
    
  }

  
 
}
