window.addEventListener("DOMContentLoaded", function(){
	let mainVideo=document.getElementById("main_video");

	mainVideo.addEventListener("loadeddata", function(){
		mainVideo.muted=true
		mainVideo.play();
	});
	mainVideo.addEventListener("ended", function(){
		mainVideo.currentTime=0;
		mainVideo.play();
	});

	let tab=document.querySelector("#header .tab a");
	let mobile=document.querySelector("#index .mobile");
	let mobileLi=document.querySelectorAll("#index .mobile .menu li");
	let wheelArea=document.querySelector("#index .wheel_area");
	let wheelCont=wheelArea.firstElementChild;
	let wheelSection=wheelCont.children;
	let mobileClose=document.querySelector("#index .mobile a.close");
	let body=document.body;
	let index=document.getElementById("index");
	let about=document.getElementById("about");
	let skills=document.getElementById("skills");

	tab.addEventListener("click", function(e){
		e.preventDefault();
		mobile.classList.add("active");
		tab.parentElement.classList.add("active");
		wheelArea.classList.add("active");

		if(winW < 420){
			body.classList.add("fixed");
		}
	});
	mobileClose.addEventListener("click", function(e){
		e.preventDefault();
		mobile.classList.remove("active");
		tab.parentElement.classList.remove("active");
		wheelArea.classList.remove("active");

		if(body.classList.contains("fixed")) body.classList.remove("fixed");
	});

	const mainSwiper=new Swiper(".firstSwiper", {
		slidesPerView: 3,
		spaceBetween: 30,
		pagination: {
			el: ".swiper-pagination",
			dynamicBullets: true,
			clickable: true
		}
	});

	let deviceStatus;
	let mainWheelAble;
	let mainCategoryH;
	let winW, winH, winHalf;
	let timer;
	let mainN=0;
	let mainTotal=5;
	let mainWheelTotal=3;
	let moving=false;
	let t=0;

	let gnb=document.querySelector("#gnb");
	let gnbLi=gnb.firstElementChild.children;
	let mMenu=document.querySelector("#index .mobile");
	let mMenuLi=mMenu.getElementsByTagName("li");
	let pMenu=document.querySelector(".wheel_area .left_options .pagination");
	let pMenuLi=pMenu.children;
	let portfolio=document.querySelector("#portfolio");
	let footer=document.querySelector("#footer");
	let currentNum=document.querySelector("#index .tab .current");
	let totalNum=document.querySelector("#index .tab .total");
	let resume=document.querySelector("#index .resume");

	function indexWheelMoving(){
		moving=true;
		let targetY=mainN*-1*mainCategoryH;
		buttonActive();

		gsap.to(wheelCont, {top: targetY, duration: 0.8, onComplete: function(){
			moving=false;
		}});
	}
	function pageScrollMoving(h){
		if(h == 0){
			gsap.to(window, {scrollTo: 0, duration: 0.3, onComplete: function(){
				mainN=mainWheelTotal-1;
				mainWheelAble=true;
				indexWheelMoving();
				buttonActive();
			}});
		}
		else{
			if(mainN == 3){
				gsap.to(window, {scrollTo: h, duration: 0.3});
				gsap.to(portfolio, {scrollTo: 0, duration: 0.3, onComplete: function(){
					if(!portfolio.classList.contains("active")) portfolio.classList.add("active");
					mainWheelAble=false;
					moving=false;
				}});
			}
			else if(mainN == 4){
				gsap.to(window, {scrollTo: h, duration: 0.3});
				gsap.to(portfolio, {scrollTo: portfolio.scrollHeight-winH, duration: 0.3, onComplete: function(){
					if(!portfolio.classList.contains("active")) portfolio.classList.add("active");
					mainWheelAble=false;
					moving=false;
				}});
			}

			buttonActive();
		}
	}
	function buttonActive(n=mainN){
		numActive();

		for(let i=0; i < gnbLi.length; i++){
			if(i == n){
				gnbLi[i].classList.add("active");
				mMenuLi[i].classList.add("active");

				if(i < mainWheelTotal) pMenuLi[i].classList.add("active");
			}
			else{
				gnbLi[i].classList.remove("active");
				mMenuLi[i].classList.remove("active");

				if(i < mainWheelTotal) pMenuLi[i].classList.remove("active");
			}
		}
	}
	function numActive(){
		current=mainN;
		currentNum.textContent=(current+1);
		totalNum.textContent=(mainTotal);
	}
	function clickMoving(){
		if (deviceStatus == "mobile" || moving == true) return;

		let clickMovingN=mainN;

		if(mainN < mainWheelTotal){
			if(document.documentElement.scrollTop == 0){
				indexWheelMoving();
			}
			else{
				if(portfolio.scrollTop == 0){
					moving=true;

					gsap.to(window, {scrollTo: 0, duration: 0.1, onComplete: function(){
						indexWheelMoving();
						mainWheelAble=true;

						setTimeout(function(){
							moving=false;
						}, 50);
					}});
				}
				else{
					moving=true;

					gsap.to(portfolio, {scrollTo: 0, duration: 0.3, onComplete: function(){
						gsap.to(window, {scrollTo: 0, duration: 0.3, onComplete: function(){
							indexWheelMoving();
							mainWheelAble=true;

							setTimeout(function(){
								moving=false;
							}, 50);
						}});
					}});
				}
			}
		}
		else{
			pageScrollMoving(winH);
		}

		buttonActive();
	}
	function init(){
		winW=window.innerWidth;
		winH=window.innerHeight;
		winHalf=winH/2;

		let wheelAreaHeight=winH*68/100;
		wheelArea.style.height=wheelAreaHeight+"px";
		mainCategoryH=wheelAreaHeight-30;

		if(winW > 720){
			deviceStatus="pc";
		}
		else{
			deviceStatus="mobile";
			index.classList.add("active");
		}

		for(let i=0; i<wheelSection.length; i++){
			wheelSection[i].style.height=mainCategoryH+"px";
		}

		setTimeout(function(){
			gsap.to(window, {scrollTo: 0, duration: 0.3});
			buttonActive();
		}, 50);
	}

	init();

	window.addEventListener("resize", function(){
		clearTimeout(timer);

		timer=setTimeout(function(){
			winW=window.innerWidth;
			winH=window.innerHeight;
			winHalf=winH/2;

			if(winW > 720){
				deviceStatus="pc";
			}
			else{
				deviceStatus="mobile";
			}

			if(deviceStatus == "pc"){
				let wheelAreaHeight=winH*68/100;
				wheelArea.style.height=wheelAreaHeight+"px";
				mainCategoryH=wheelAreaHeight-30;

				for(let i=0; i<wheelSection.length; i++){
					wheelSection[i].style.height=mainCategoryH+"px";
				}

				if(mainN < mainWheelTotal){
					let targetY=mainN*-1*mainCategoryH;

					gsap.to(window, {scrollTo: 0, duration: 0.3});
					gsap.to(wheelCont, {top: targetY, duration: 0.3});
				}
				else{
					pageScrollMoving(winH);
				}

				if(resume.classList.contains("active") == false) resume.classList.remove("active");
			}
			else{
				if(moving) return;
				moving=true;

				gsap.to(window, {scrollTo: mobilePageList[mainN].offsetTop, duration: 0.3, onComplete: function(){
					if(mobilePageList[mainN].classList.contains("active") == false) mobilePageList[mainN].classList.add("active");
					moving=false;
				}});
			}

			buttonActive();
		}, 50);
	});
	wheelArea.addEventListener("mousewheel", function(e){
		if(deviceStatus == "mobile" || moving == true) return;

		clearTimeout(timer);

		timer=setTimeout(function(){
			if(e.deltaY < 0){
				if(mainN > 0){
					mainN-=1;
				}
				else{
					return;
				}
			}
			else{
				if(mainN < mainWheelTotal-1){
					mainN+=1;
				}
				else{
					mainN=mainWheelTotal;
					pageScrollMoving(winH);
					portfolio.classList.add("active");
					return;
				}
			}
			indexWheelMoving();
		}, 50);
	});
	portfolio.addEventListener("mousewheel", function(e){
		if(deviceStatus == "mobile" || moving == true) return;

		clearTimeout(timer);

		timer=setTimeout(function(){
			t=portfolio.scrollTop;

			if(t == 0 && e.deltaY < 0){
				pageScrollMoving(0);
				buttonActive();
			}
		}, 50);
	});

	let mobilePageList=[index, about, skills, portfolio, footer];

	function mobileClick(){
		if (deviceStatus == "pc") return;

		if(body.classList.contains("fixed") == true) body.classList.remove("fixed");

		for(let i=0; i<mobilePageList.length; i++){
			mobilePageList[i].index=i;
			if(mainN == i){
				gsap.to(window, {scrollTo: mobilePageList[i].offsetTop, duration: 0.8});
			}
		}
	}

	portfolio.addEventListener("scroll", function(){
		if(deviceStatus == "mobile" || moving == true) return;

		clearTimeout(timer);

		timer=setTimeout(function(){
			t=portfolio.scrollTop;

			if(t <= portfolio.firstElementChild.offsetHeight-window.innerHeight-50){
				mainN=3;
			}
			else{
				mainN=4;
				if(footer.classList.contains("active") == false) footer.classList.add("active");
			}

			buttonActive();
		}, 10);
	});

	for(let i=0; i<gnbLi.length; i++){
		gnbLi[i].index=i;
		mobileLi[i].index=i;

		gnbLi[i].addEventListener("click", function(e){
			e.preventDefault();
			mainN=e.currentTarget.index;
			clickMoving();
		});
		mobileLi[i].addEventListener("click", function(e){
			e.preventDefault();
			mainN=e.currentTarget.index;
			mobile.classList.remove("active");
			tab.parentElement.classList.remove("active");
			wheelArea.classList.remove("active");

			setTimeout(function(){
				if(deviceStatus == "pc"){
					clickMoving();
				}
				else{
					if(body.classList.contains("fixed") == false) body.classList.add("fixed");

					mobileClick();
				}
			}, 500);
		});
	}
	for(let i=0; i<pMenuLi.length; i++){
		pMenuLi[i].index=i;

		pMenuLi[i].addEventListener("click", function(e){
			e.preventDefault();
			mainN=e.currentTarget.index;
			clickMoving();
		});
	}

	window.addEventListener("scroll", function(){
		if(deviceStatus == "pc") return;

		clearTimeout(timer);

		timer=setTimeout(function(){
			t=window.pageYOffset;

			if(t <= about.offsetTop-winHalf){
				mainN=0;
				index.classList.add("active");
				resume.classList.add("active");
			}
			else if(t <= skills.offsetTop-winHalf){
				mainN=1;
				about.classList.add("active");
			}
			else if(t <= portfolio.offsetTop-winHalf){
				mainN=2;
				skills.classList.add("active");
				resume.classList.remove("active");
			}
			else if(t <= footer.offsetTop-winHalf) {
				mainN=3;
				portfolio.classList.add("active");
				resume.classList.remove("active");
			}
			else{
				mainN=4;
				footer.classList.add("active");
				resume.classList.add("active");
			}
			buttonActive();
		}, 10);
	});

	let projectN=0;
	let project=portfolio.getElementsByClassName("project");

	for(let i=0; i<project.length; i++){
		project[i].index=i;
		project[0].classList.add("active");

		project[i].firstElementChild.addEventListener("click", function(e){
			e.preventDefault();
			projectN=e.currentTarget.parentElement.index;

			for(let j=0; j<project.length; j++){
				if(j == projectN){
					project[j].classList.add("active");

					if(deviceStatus == "mobile"){
						gsap.to(window, {scrollTo: project[j].offsetTop -30, duration: 0.4});
					}
					else{
						let pPadding=300;
						let pHeight=335;

						gsap.to(portfolio, {scrollTo: pPadding+pHeight*projectN, duration: 0.4});
					}
				}
				else{
					project[j].classList.remove("active");
				}
			}
		});
	}
});