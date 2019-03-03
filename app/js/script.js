window.onload = function () {



	// показать\скрыть коментарии\настройки
	var switchToggle = document.querySelector(".switch-btn");
	var editOptions = document.querySelector(".edit_options");
	var reviews = document.querySelector(".reviews");

	switchToggle.addEventListener("click", function(){
		this.classList.toggle("switch-on")
		if (switchToggle.classList.contains("switch-on")){
			editOptions.classList.add("display_none")
			reviews.classList.remove("display_none")
		}
		else {
			editOptions.classList.remove("display_none")
			reviews.classList.add("display_none")
		}
	})

	//выпадающее время работы
	var x, i, j, selElmnt, a, b, c;
	/* Look for any elements with the class "custom-select": */
	x = document.getElementsByClassName("custom-select");
	for (i = 0; i < x.length; i++) {
	  selElmnt = x[i].getElementsByTagName("select")[0];
	  /* For each element, create a new DIV that will act as the selected item: */
	  a = document.createElement("DIV");
	  a.setAttribute("class", "select-selected");
	  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
	  x[i].appendChild(a);
	  /* For each element, create a new DIV that will contain the option list: */
	  b = document.createElement("DIV");
	  b.setAttribute("class", "select-items select-hide");
	  for (j = 1; j < selElmnt.length; j++) {
	    /* For each option in the original select element,
	    create a new DIV that will act as an option item: */
	    c = document.createElement("DIV");
	    c.innerHTML = selElmnt.options[j].innerHTML;
	    c.addEventListener("click", function(e) {
	        /* When an item is clicked, update the original select box,
	        and the selected item: */
	        var y, i, k, s, h;
	        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
	        h = this.parentNode.previousSibling;
	        for (i = 0; i < s.length; i++) {
	          if (s.options[i].innerHTML == this.innerHTML) {
	            s.selectedIndex = i;
	            h.innerHTML = this.innerHTML;
	            y = this.parentNode.getElementsByClassName("same-as-selected");
	            for (k = 0; k < y.length; k++) {
	              y[k].removeAttribute("class");
	            }
	            this.setAttribute("class", "same-as-selected");
	            break;
	          }
	        }
	        h.click();
	    });
	    b.appendChild(c);
	  }
	  x[i].appendChild(b);
	  a.addEventListener("click", function(e) {
	    /* When the select box is clicked, close any other select boxes,
	    and open/close the current select box: */
	    e.stopPropagation();
	    closeAllSelect(this);
	    this.nextSibling.classList.toggle("select-hide");
	    this.classList.toggle("select-arrow-active");
	  });
	}

	function closeAllSelect(elmnt) {
	  /* A function that will close all select boxes in the document,
	  except the current select box: */
	  var x, y, i, arrNo = [];
	  x = document.getElementsByClassName("select-items");
	  y = document.getElementsByClassName("select-selected");
	  for (i = 0; i < y.length; i++) {
	    if (elmnt == y[i]) {
	      arrNo.push(i)
	    } else {
	      y[i].classList.remove("select-arrow-active");
	    }
	  }
	  for (i = 0; i < x.length; i++) {
	    if (arrNo.indexOf(i)) {
	      x[i].classList.add("select-hide");
	    }
	  }
	}

	/* If the user clicks anywhere outside the select box,
	then close all select boxes: */
	document.addEventListener("click", closeAllSelect);

	//добавить\убрать цвет при нажатии на день недели
	var dayChange = document.getElementsByClassName("week_day")

	for(var i = 0; i < dayChange.length; i++) {
		dayChange[i].addEventListener("click", function(){
			this.classList.toggle("bg_green");
			this.childNodes[1].classList.toggle("font_color")
			// var fontChange = this.childNodes[1];
			// fontChange.toggle("font_color")		
		});
	}
	//показать pop-up добавить услугу

	//закрыть поп-ап
	function closeServicePopUP() {
		showPopUp.classList.add("display_none");
		document.body.style.overflow = 'visible'
	}

	var addService = document.querySelector(".btn_add_service");
	var showPopUp = document.querySelector(".popup_add_service");
	var closePopUp = document.querySelector(".cancel_btn");
	var addServiceToList = document.querySelector(".add_service_btn") 
	var serviceName = document.getElementById("service_name")

	addService.addEventListener("click", function(){
		showPopUp.classList.remove("display_none");	
		document.body.style.overflow = 'hidden';
		serviceName.focus();
		serviceName.value = '';

		window.addEventListener("keydown", function( event ) {
	    if ( event.keyCode == 13 ) {
				addServ();
		    }
		}); 

		window.addEventListener("keydown", function( event ) {
		    if ( event.keyCode == 27 ) {
				closeServicePopUP()
		    }
		});
		document.body.addEventListener("click", function(e){
			var target = e.target;
			if(target.className === "popup_add_service"){
				closeServicePopUP()
			}
		});
	});
	closePopUp.addEventListener("click", closeServicePopUP);

	//добавить услугу в список
	var close = document.getElementsByClassName("close_executor");
	addServiceToList.addEventListener("click", addServ)

	function addServ() {

		var parentNewP = document.querySelector(".sidebar");
		var getServiceName = serviceName.value;
		var newService = document.createElement("p");
		newService.innerHTML = serviceName.value;
		parentNewP.insertBefore(newService, addService);
		newService.classList.add("new_div");
		showPopUp.classList.remove("display_block");
		showPopUp.classList.add("display_none");


		var imgClose = document.createElement("img");
		newService.insertBefore(imgClose, null);
		imgClose.classList.add("close_executor");
		imgClose.setAttribute("src", "img/close.psb.png");
		document.body.style.overflow = 'visible';

		removeItem()
	};	


	//удалить услугу
	function removeItem() {
		for (var i = 0; i < close.length; i++){
			close[i].onclick = function() {
				this.parentNode.remove()
			}
		}
	}
	removeItem();

	//pop-up вход, регистрация
	var signInHeader = document.querySelector(".sign_in_header");
	var regHeader = document.querySelector(".reg_header");
	var signInPopUp = document.querySelector(".sign_in_popup");
	var closePopUp = document.querySelector(".sign_in_form_block_button");
	var regPopUp = document.querySelector(".reg_pop_up");
	var closeRegPopUp = document.querySelector(".close_popup");
	var goToRegPopUp = document.querySelector(".reg_button");
	var goToSignIn = document.querySelector(".go_to_sign_in");

	//закрыть поп-ап входа
	function CloseSignInPopUp(){
		signInPopUp.classList.add("display_none");
		document.body.style.overflow = 'visible'
	} 

	signInHeader.addEventListener("click", function() {
		signInPopUp.classList.remove("display_none");
		document.body.style.overflow = 'hidden';
		window.onkeydown = function( event ) {
		    if ( event.keyCode == 27 ) {
				CloseSignInPopUp()
		    }
		};

		// закрыть поп-ап по клику
		document.body.addEventListener("click", function(e){
			var target = e.target;
			if(target.className === "sign_in_popup"){
				CloseSignInPopUp()
			}
		});
	});
	closePopUp.addEventListener("click", CloseSignInPopUp)

	//закрыть поп-ап регистрации
	function closeeRegPopUp() {
		regPopUp.classList.add("display_none");
		document.body.style.overflow = 'visible';
	};

	regHeader.addEventListener("click", function() {
			
		regPopUp.classList.remove("display_none");
		document.body.style.overflow = 'hidden';
		window.onkeydown = function( event ) {
		    if ( event.keyCode == 27 ) {
				closeeRegPopUp()
		    }
		};

		document.body.addEventListener("click", function(e){
			var target = e.target;
			if(target.className === "reg_pop_up"){
				closeeRegPopUp()
			}
		});
		closeRegPopUp.addEventListener("click", closeeRegPopUp)
	});
	

	goToRegPopUp.addEventListener("click", function() {
		signInPopUp.classList.add("display_none");
		regPopUp.classList.remove("display_none");

		document.body.addEventListener("click", function(e){
			var target = e.target;
			if(target.className === "reg_pop_up"){
				closeeRegPopUp()
			}
		});
		window.onkeydown = function( event ) {
		    if ( event.keyCode == 27 ) {
				closeeRegPopUp()
		    }
		};
	});

	goToSignIn.addEventListener("click", function() {
		regPopUp.classList.add("display_none");
		signInPopUp.classList.remove("display_none");

		document.body.addEventListener("click", function(e){
			var target = e.target;
			if(target.className === "sign_in_popup"){
				CloseSignInPopUp()
			}
		});

		window.onkeydown = function( event ) {
		    if ( event.keyCode == 27 ) {
				CloseSignInPopUp()
		    }
		};
	});

	//поп-ап добавить обявление
	var addServicee = document.getElementById("add_servicee");
	var showServicePopUp = document.querySelector(".add_service_popup");
	var closeAddServiceePopUp = document.getElementById("close_service_popup");
	var closeServicePopUp1 = document.querySelector(".cancel_button");

	addServicee.addEventListener("click", function() {
		showServicePopUp.classList.remove("display_none");
		document.body.style.overflow = "hidden";

		// закрыть поп-ап по клику

		//закрыть поп-ап "добавить обявление"
		function closePopUpAddService(){
			showServicePopUp.classList.add("display_none");
			document.body.style.overflow = "auto";
		}

		document.body.addEventListener("click", function(e){
			var target = e.target;
			if(target.className === "add_service_popup"){
				closePopUpAddService();
			}
		});

		//закрыть модальное окно на escape
		window.onkeydown = function( event ) {
		    if ( event.keyCode == 27 ) {
	        	closePopUpAddService()
		    }
		};
		closeServicePopUp1.addEventListener("click", closePopUpAddService)
		closeAddServiceePopUp.addEventListener("click", closePopUpAddService)

			//выбрать выбрать\выбрано

		var change = document.getElementsByClassName("table_button");
		for(i = 0; i < change.length; i++){
			change[i].addEventListener("click",function(){
				this.classList.toggle("change");
				if(this.innerHTML === "Выбрано") {
					this.innerHTML = "Выбрать";
				}
				else {
					this.innerHTML = "Выбрано";
				}
			});
		}
	});

}
