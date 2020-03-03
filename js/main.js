	/* Transition Effects */
	sal()

	/* HEADING EFFECT START */
	if(!window.matchMedia("(max-width: 798px)").matches){ // animation fires only on desktop 
		let tl = gsap.timeline({repeat:-1});
		 tl.
		  to('.landingH1 .underline:nth-child(1)', 1.5, {y:"0%", ease: "elastic.out(2, 1.5)", delay:0, stagger:1})
		  .to('.landingH1 .underline:nth-child(1)', 1.2, {y:"-200%", ease:"Power4.in", delay:0.5, stagger:1})
		  .to('.landingH1 .underline:nth-child(2)', 1.5, {y:"0%", ease: "elastic.out(2, 1.5)", delay:0, stagger:1})
		  .to('.landingH1 .underline:nth-child(2)', 1.2, {y:"-200%", ease:"Power4.in", delay:0.5, stagger:1})
		  .to('.landingH1 .underline:nth-child(3)', 1.5, {y:"0%", ease: "elastic.out(2, 1.5)", delay:0, stagger:1})
		  .to('.landingH1 .underline:nth-child(3)', 1.2, {y:"-200%", ease:"Power4.in", delay:0.5, stagger:1})
		  .to('.landingH1 .underline:nth-child(4)', 1.5, {y:"0%", ease:"elastic.out(2, 1.5)" , delay:0, stagger:1})
		  .to('.landingH1 .underline:nth-child(4)', 1.2, {y:"-200%", ease:"Power4.in", delay:0.5, stagger:1})
		/* HEADING EFFECT END */

		/* SERVICES ANIMATION START */
		let tl2 = gsap.timeline({repeat:-1});
		let tl3 = gsap.timeline({repeat:-1});

	
	gsap.registerPlugin(MotionPathPlugin);

	gsap.set('.heart1, .heart2', {xPercent: 20, yPercent: 180, transformOrigin: "50% 50%"})
	
	tl2.to(".heart1", {
	    motionPath: {
	        path: ".heart1path",
	        align: "self"
	    },
   	    css: {scale:'2', fill:'rgba(155, 68, 241, .8)'},
 	    yoyo:true,
	    duration: 3,
	    ease: "power1.inOut"
	})
	.to( '.heart1' ,1, {opacity:0})
	tl3.to(".heart2", {
	    motionPath: {
	        path: ".heart2path",
	        align: "self"
	    },
	    css: {scale:'2', fill:'rgba(155, 68, 241, .5)'},
	    yoyo:true,
	    duration: 3,
	    ease: "power1.inOut"
	})
	.to('.heart2', 1, {opacity:0})

	/* SERVICES ANIMATION END */
	}

	 // FOOTER ANIMATION START 
	let tl4 = gsap.timeline()
	let tl5 = gsap.timeline()

	gsap.set('#circle-1', {xPercent: 10, yPercent: -30, transformOrigin: "50% 50%"})
	tl4.to("#circle-1", {
	    motionPath: {
	        path: "#circle-path",
	        align: "self",
    	    end:0,
    	    start:1,
    	    curviness:2,
    	    type:"cubic",
    	    offsetX:-50
	    },
	    duration: 10,
	    ease: "power1.inOut",
	    onComplete:function(){
	    	tl4.to("#circle-1", {
	    		opacity:0,
		    		y:-200,
	    		x:-50,
	    	})
	    }
	})


	gsap.set(".cr", {y:350, opacity:1});
	tl5.to('.cr',{
		y:-1500,
		stagger:0.5,
		ease:"power4.inOut",
		duration:10,
		repeat:-1,
		// opacity:1
	})

	/* FOOTER ANIMATION START */