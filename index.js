
document.addEventListener('DOMContentLoaded', () => {
    
    // link underline of current page
    const links = document.querySelectorAll('.navlink');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });



    // hamburger menu dropdown
    // body.noscroll & position fixed = show the div in viewport w/o scrolling
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const hamNavDiv = document.getElementById("ham-navdiv"); 

    hamburgerIcon.addEventListener("click", function () {
        if (hamNavDiv.classList.contains("active")) { 
            hamNavDiv.classList.remove("active");
            document.body.classList.remove("no-scroll");
        } else {
            hamNavDiv.classList.add("active");
            document.body.classList.add("no-scroll");
        }
    });


    if (window.location.pathname === '/index.html') {

        // location button scroll to footer
        const locationBtn = document.getElementById("find-btn");
        const footer = document.getElementById("footer");

        function scrollToFooter() {
            footer.scrollIntoView({behavior: "smooth" });
        }

        locationBtn.addEventListener("click", scrollToFooter);


        // bestseller cards animation
        const leftImg = document.getElementById("best-4");
        const centerImg = document.getElementById("best-main");
        const rightImg = document.getElementById("best-2");
        const hiddenImg = document.getElementById("best-3");

        let isDragging = false;
        let startX; // starting x position of drag

        // initial images
        leftImg.style.backgroundImage = 'url(assets/best-4.jpg)';
        centerImg.style.backgroundImage = 'url(assets/best-main.jpg)';
        rightImg.style.backgroundImage = 'url(assets/best-2.jpg)';
        hiddenImg.style.backgroundImage = 'url(assets/best-3.jpg)';

        // mouse events for mouse and touch move for touch devices
        centerImg.addEventListener('mousedown', startDrag);
        centerImg.addEventListener('touchstart', startDrag, { passive: false });

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('touchmove', onDrag, { passive: false });

        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);

        function startDrag(event) {
            isDragging = true;
            startX = event.touches ? event.touches[0].clientX : event.clientX;  // initial x position
            // event.touches = list of touch objects
            // event.touches[0].clientX = first touch point relative to viewport
            // event.clientX = fallback or initial position
            event.preventDefault();
        }

        function onDrag(event) {
            if (!isDragging) return;

            const currentX = event.touches ? event.touches[0].clientX : event.clientX; // current x position
            const moveX = currentX - startX; // distance moved

            centerImg.style.transform = 'translateX(${moveX}px) scale(1.2)';

            if (moveX > 100) {
                rotateImages('right');
                endDrag();
            } else if (moveX <- 100) {
                rotateImages('left');
                endDrag();
            }
        }

        function endDrag() {
            if (!isDragging) return;

            isDragging = false;
            centerImg.style.transform = 'translateX(0) scale(1.2)'; // reset image position
        }

        leftImg.addEventListener("click", function() {
            rotateImages('left');
        });

        rightImg.addEventListener("click", function() {
            rotateImages('right');
        });

        function rotateImages(direction) {
            let leftBackground = leftImg.style.backgroundImage;
            let centerBackground = centerImg.style.backgroundImage;
            let rightBackground = rightImg.style.backgroundImage;
            let hiddenBackground = hiddenImg.style.backgroundImage;

            if (direction === 'left') {
                centerImg.style.backgroundImage = leftBackground;
                rightImg.style.backgroundImage = centerBackground;
                hiddenImg.style.backgroundImage = rightBackground;
                leftImg.style.backgroundImage = hiddenBackground;
            } else if (direction === 'right') {
                centerImg.style.backgroundImage = rightBackground;
                leftImg.style.backgroundImage = centerBackground;
                hiddenImg.style.backgroundImage = leftBackground;
                rightImg.style.backgroundImage = hiddenBackground;
            }

            updateText();
        }

        function updateText() {
            const titleMain = document.getElementById("title-main");
            const txtMain = document.getElementById("txt-main");
            const centerImgBackground = centerImg.style.backgroundImage;

            if (centerImgBackground.includes('best-main.jpg')) {
                titleMain.textContent = "Lammkoteletts";
                txtMain.textContent = "Zarte Lammkoteletts oder eine kunstvoll arrangierte Lammkrone, gegrillt und mit frischen Gartenkräutern verfeinert. Ein perfektes Zusammenspiel aus saftigem Fleisch und aromatischen Kräutern, das die Essenz der griechischen Küche einfängt";
            } else if (centerImgBackground.includes('best-4.jpg')) {
                titleMain.textContent = "Souvlaki";
                txtMain.textContent = "Perfekt gegrillt bis zur zarten Vollendung, serviert mit knusprigen Pommes und einer Beilage aus cremigem Tzatziki. Ein Geschmack von Griechenland, der unsere Kunden immer wieder zurückkommen lässt";
            } else if (centerImgBackground.includes('best-2.jpg')) {
                titleMain.textContent = "Lammkronen";
                txtMain.textContent = "2 Lammkronen, Lammfilet und Lammsteak, serviert mit knusprigen Pommes und cremigem Tzatziki. Ein unwiderstehlicher Genuss, der die Essenz Griechenlands einfängt";
            } else {
                titleMain.textContent = "Suzukakia";
                txtMain.textContent = "Unsere Hackfleischröllchen sind verfeinert mit einer ganz speziellen Gewürzmischung, dadurch erhalten sie einen unverwechselbaren Geschmack";
            }
        }

        updateText();
    }


    if (window.location.pathname === '/speisekarte.html') {


        // speisekarte page - disabling scroll for category div
        const menuDiv = document.getElementById('menucat-div');
        const dishesDiv = document.getElementById("menucat-samplesdiv");
        const menukartePage = document.getElementById("menukarte-page");

    
        function isFooterVisible() {
        const rect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
    
        // Check if any part of the footer is within the viewport
        return (
            rect.top < viewportHeight && rect.bottom >= 0
        );
        }
    
        function handleScroll() {
        const viewportHeight = window.innerHeight;
        
            if (window.scrollY >= viewportHeight) {
                menuDiv.classList.add("active");
                menuDiv.style.paddingTop = '60px';
                dishesDiv.style.marginLeft = '40vw';
            } else {
                menuDiv.classList.remove("active");
                dishesDiv.style.marginLeft = '0vw';
            }
        
            if (isFooterVisible()) {
                console.log('Footer is visible in the viewport');
                menuDiv.classList.remove("active");
                dishesDiv.style.marginLeft = '0vw';
                menukartePage.classList.add('active');
            } else {
                console.log('Footer is not visible in the viewport');
                menukartePage.classList.remove('active');
            }
        }

    
        function updateScrollListener() {
            const viewportWidth = window.innerWidth;

            if (viewportWidth >= 768) {
                // Add scroll event listener if viewport width is 768px or greater
                window.addEventListener('scroll', handleScroll);
                handleScroll(); // Initial call to handleScroll in case the page is already scrolled
            } else {
                // Remove scroll event listener if viewport width is less than 768px
                window.removeEventListener('scroll', handleScroll);
            }
        }

        // Call updateScrollListener on page load and window resize
        updateScrollListener();
        window.addEventListener('resize', updateScrollListener);



        // change the content of dishes when category gets chosen
        const menuContent = document.getElementById('specialties');
        const hamDropdown = document.getElementById('category');

        
        const menuLink1 = document.getElementById('menucat-1');
        const menuLink2 = document.getElementById('menucat-2');
        const menuLink3 = document.getElementById('menucat-3');
        const menuLink4 = document.getElementById('menucat-4');
        const menuLink5 = document.getElementById('menucat-5');
        const menuLink6 = document.getElementById('menucat-6');
        const menuLink7 = document.getElementById('menucat-7');
        const menuLink8 = document.getElementById('menucat-8');
        const menuLink9 = document.getElementById('menucat-9');
        const menuLink10 = document.getElementById('menucat-10');
        const menuLink11 = document.getElementById('menucat-11');
        const menuLink12 = document.getElementById('menucat-12');
        const menuLink13 = document.getElementById('menucat-13');


        function handleHamburgerCategory(event) {
            const selectedValue = event.target.value;

            if (selectedValue === 'category2') {
                changeToCategory2();
            } else if (selectedValue === 'category3') {
                changeToCategory3();
            } else if (selectedValue === 'category4') {
                changeToCategory4();
            } else if (selectedValue === 'category5') {
                changeToCategory5();
            } else if (selectedValue === 'category6') {
                changeToCategory6();
            } else if (selectedValue === 'category7') {
                changeToCategory7();
            } else if (selectedValue === 'category8') {
                changeToCategory8();
            } else if (selectedValue === 'category9') {
                changeToCategory9();
            } else if (selectedValue === 'category10') {
                changeToCategory10();
            } else if (selectedValue === 'category11') {
                changeToCategory11();
            } else if (selectedValue === 'category12') {
                changeToCategory12();
            } else if (selectedValue === 'category13') {
                changeToCategory13();
            } else {
                changeToCategory1();
            }

        }

        hamDropdown.addEventListener('change', handleHamburgerCategory);
        handleHamburgerCategory({ target: hamDropdown});

        menuLink1.addEventListener('click', changeToCategory1);

        function changeToCategory1 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink1.style.textDecoration = 'underline';
            menuLink1.style.textDecorationThickness = '1px';
            menuLink1.style.textUnderlineOffset = '6px';
            menuContent.innerHTML = `
            <div class="menu-category" id="specialties">
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Mousaka</h4>
                            <p id="dish-price">16,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">TRADITIONELLES GERICHT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gyros / Käsesosse</h4>
                            <p id="dish-price">17,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">SCHWEINEFLEISCH VOM DREHSPIESS</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gyros / Chilisosse</h4>
                            <p id="dish-price">16,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">SCHWEINEFLEISCH VOM DREHSPIESS</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gyros mit Tzatziki</h4>
                            <p id="dish-price">16,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">SCHWEINEFLEISCH VOM DREHSPIESS</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gyros / Pfefferrahmsosse</h4>
                            <p id="dish-price">16,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">SCHWEINEFLEISCH VOM DREHSPIESS</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Bifteki</h4>
                            <p id="dish-price">17,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">HACKSTEAK MIT SCHAFFSKÄSEFÜLLUNG</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Suzukakia</h4>
                            <p id="dish-price">16,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">HACKFLEISCHROLLCHEN MIT TZATZIKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Souvlaki</h4>
                            <p id="dish-price">16,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">FLEISCHSPIESS VOM SCHWEIN MIT TZATZIKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gefüllter Spiess</h4>
                            <p id="dish-price">18,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">VOM SCHWEIN MIT SCHAFFSKÄSEFÜLLUNG</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Bauernspiess</h4>
                            <p id="dish-price">18,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT KÄSE ÜBERBACKEN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Lammkoteletts</h4>
                            <p id="dish-price">17,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">LAMMKRONE MIT FRISCHEM KNOBLAUCH</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Lammkoteletts</h4>
                            <p id="dish-price">16,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">LAMMKRONE MIT FRISCHEM GARTENKRÄUTERN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Lammspiess</h4>
                            <p id="dish-price">16,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT FRISCHEM KNOBLAUCH</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Lammfillet</h4>
                            <p id="dish-price">16,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT DICKEN BOHNEN & SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Teufelspiess</h4>
                            <p id="dish-price">17,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">SCHWEINEFILLET MIT CHILISOSSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Rinderleber</h4>
                            <p id="dish-price">16,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT ROSTZWIEBELN IN BRATENSOSSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Knoblauchspiess</h4>
                            <p id="dish-price">16,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">SCHWEINEFILLET MIT FRISCHEM KNOBLAUCH</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Mix-Spiess</h4>
                            <p id="dish-price">18,90€</p>
                         </div>
                         <hr id="menuline">
                         <p id="dish-info">RUMPSTEAK & SCHWEINEFILLET</p>
                        <div class="specialty-dishdiv">
                              <h4 id="specialty-title">Chef-Spiess</h4>
                              <p id="dish-price">18,50€</p>
                        </div>
                            <hr id="menuline">
                            <p id="dish-info">2 LAMMKRONEN, RUMPSTEAK, & 2 LENDEN</p>
                        </div>
                    </div>
            `
        };

        menuLink2.addEventListener('click', changeToCategory2);

        //menuLink2.addEventListener('click', () => {
        function changeToCategory2 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink2.style.textDecoration = 'underline';
            menuLink2.style.textDecorationThickness = '1px';
            menuLink2.style.textUnderlineOffset = '6px';
            menuContent.innerHTML = `
            <div class="menu-category" id="vorspeisen">
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Paprikaspitzen</h4>
                            <p id="dish-price">8,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEFÜLLT MIT SCHAFSKÄSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Tzatziki</h4>
                            <p id="dish-price">6,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">JOGHURT, GURKEN, OLIVENÖL, FRISCHER KNOBLAUCH</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Orektika</h4>
                            <p id="dish-price">8,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">TZATZIKI, CHTIPITI, TARAMA</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Tarama</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GRIECHISCHER KAVIAR MIT GURKEN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Schäferplatte</h4>
                            <p id="dish-price">9,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">PEPERONI, OLIVEN, SCHAFSKÄSE, OLIVENÖL</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Chtipiti</h4>
                            <p id="dish-price">8,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">SCHAFSKÄSE, FRISCHER KNOBLAUCH, PAPRIKA, OLIVENÖL</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Oliventeller</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT SALAT GARNIERT IN OLIVENÖL</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Tomaten und Mozarella</h4>
                            <p id="dish-price">9,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT GARTENKRÄUTERN & OLIVENÖL</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Auberginensalat</h4>
                            <p id="dish-price">8,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT SCHAFSKÄSE GARNIERT, KNOBLAUCH</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Vorspeisekreation 1</h4>
                            <p id="dish-price">16,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">FÜR 1 PERSON</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Vorspeisekreation 2</h4>
                            <p id="dish-price">29,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">FÜR 2 PERSONEN (KALT & WARM)</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Schafskäse - Natur</h4>
                            <p id="dish-price">8,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GARTENKRÄUTER, OLIVENÖL</p>
                    </div>
            `
        };

        menuLink3.addEventListener('click', changeToCategory3);

        function changeToCategory3 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink3.style.textDecoration = 'underline';
            menuLink3.style.textDecorationThickness = '1px';
            menuLink3.style.textUnderlineOffset = '6px';
            menuContent.innerHTML = `
            <div class="menu-category" id="warme-vorspeisen">
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Oktopus</h4>
                            <p id="dish-price">19,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLT MIT GARTENKRÄUTERN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Dakos</h4>
                            <p id="dish-price">7,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLTES WEISSBROT MIT TOMATENWÜRFELN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Zucchini</h4>
                            <p id="dish-price">8,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEBACKEN MIT TZATZIKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Auberginen</h4>
                            <p id="dish-price">8,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEBACKEN MIT TZATZIKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Zucchini</h4>
                            <p id="dish-price">8,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLT MIT GARTENKRÄUTERN UND TZATZIKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Peperoni & Champignons</h4>
                            <p id="dish-price">9,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLT MIT KNOBLAUCHSOSSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Kalamari</h4>
                            <p id="dish-price">16,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLT MIT CHAMPIGNONKÖPFEN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Schafskäse</h4>
                            <p id="dish-price">8,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLT MIT ZWIEBELN, TOMATEN, & FRISCHE KRÄUTER</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Saganaki</h4>
                            <p id="dish-price">9,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEBACKER SCHAFSKÄSE MIT SALAT GARNIERT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Peperoni</h4>
                            <p id="dish-price">7,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLT MIT KNOBLAUCH</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gigantes</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">RIESENBOHNEN IN TOMATENSOSSE & KÄSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Champignons</h4>
                            <p id="dish-price">8,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLT MIT KÄSEFÜLLUNG</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Dolmades</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT REIS GEFÜLLTE WEINBLÄTTER UND TZATZIKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Zucchinipuffer mit Tzatziki</h4>
                            <p id="dish-price">9,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">KNUSPRIGE ZUCCHINIPUFFER MIT TZATZIKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Knoblauchbrot</h4>
                            <p id="dish-price">5,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT FRISCHEM KNOBLAUCH</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Garnelen</h4>
                            <p id="dish-price">18,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLT MIT CHAMPIGNONKÖPFEN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Aubergine am Stück</h4>
                            <p id="dish-price">11,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLT MIT FETTA, TOMATEN, OLIVENÖL</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Fladenbrot</h4>
                            <p id="dish-price">2,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info"></p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Kalamares</h4>
                            <p id="dish-price">16,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEBACKEN MIT TZATZIKI & CHAMPIGNONS</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Zucchinipuffer & geb. Schafskäse und Tomaten</h4>
                            <p id="dish-price">13,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info"></p>
                    </div>
            `
        };


        menuLink4.addEventListener('click', changeToCategory4);

        function changeToCategory4 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink4.style.textDecoration = 'underline';
            menuLink4.style.textDecorationThickness = '1px';
            menuLink4.style.textUnderlineOffset = '6px';
            menuContent.innerHTML = `
            <div class="menu-category" id="salate">
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gemischter Salat</h4>
                            <p id="dish-price">9,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info"></p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Kalamari-Salat</h4>
                            <p id="dish-price">15,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT GEBACKENEM TINTENFISCH</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Thunfisch-Salat</h4>
                            <p id="dish-price">14,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">SALAT DER SAISON MIT THUNFISCH</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Bauern-Salat</h4>
                            <p id="dish-price">13,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT TOMATEN, GURKEN, SCHAFSKÄSE, USW.</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Puten-Salat</h4>
                            <p id="dish-price">15,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">PUTENSTREIFEN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gyros-Salat</h4>
                            <p id="dish-price">14,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT FLEISCH VOM DREHSPIESS</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Garnelen-Salat</h4>
                            <p id="dish-price">16,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">SALAT DER SAISON MIT GARNELEN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gartensalat</h4>
                            <p id="dish-price">14,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT SAGANAKI, CHAMPIGNIONS, & DOLMADES</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Chef-Salat</h4>
                            <p id="dish-price">17,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">SALAT DER SAISON MIT RUMPSTEAKSTREIFEN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Beilagen-Salat</h4>
                            <p id="dish-price">5,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">SALAT DER SAISON MIT HAUSDRESSING</p>
                    </div>
            `
        };

        menuLink5.addEventListener('click', changeToCategory5);

        function changeToCategory5 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink5.style.textDecoration = 'underline';
            menuLink5.style.textDecorationThickness = '1px';
            menuLink5.style.textUnderlineOffset = '6px';
            menuContent.innerHTML = `
            <div class="menu-category" id="fisch">
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Garnelen-Kalamari</h4>
                            <p id="dish-price">22,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT TZATZIKI, GEMÜSEREIS, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Lachsfilet</h4>
                            <p id="dish-price">24,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT GARTENKRÄUTER, GEMÜSEREIS, TZATZIKI, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Kalamari-Ringe</h4>
                            <p id="dish-price">18,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEBACKEN, GEMÜSEREIS, TZATZIKI, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Doradefilet</h4>
                            <p id="dish-price">19,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLT, TZATZIKI, GEMÜSEREIS, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Garnelen</h4>
                            <p id="dish-price">26,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">CHAMPIGNONS, GEMÜSEREIS, SALAT, KNOBLAUCH</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Zenderfilet</h4>
                            <p id="dish-price">19,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">TZATZIKI, GEMÜSEREIS, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Kalamari</h4>
                            <p id="dish-price">18,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">TZATZIKI, GEMÜSEREIS, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Meeresfrüchtespiess</h4>
                            <p id="dish-price">24,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">TZATZIKI, GEMÜSEREIS, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Rotbarschfilet</h4>
                            <p id="dish-price">19,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">TZATZIKI, GEMÜSEREIS, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Lachsfilet</h4>
                            <p id="dish-price">24,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT NUDELN, KÄSESOSSE, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Oktopus</h4>
                            <p id="dish-price">29,00€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLT, DICKE BOHNEN, SALAT</p>
                    </div>
            `
        };

        menuLink6.addEventListener('click', changeToCategory6);
        function changeToCategory6 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink6.style.textDecoration = 'underline';
            menuLink6.style.textDecorationThickness = '1px';
            menuLink6.style.textUnderlineOffset = '6px';
            menuContent.innerHTML = `
            <div class="menu-category" id="grill-kreationen">
                        <h4 id="dish-info">MIT POMMES, ODER GEMÜSEREIS, ODER KROKETTEN, DAZU SALAT</h4>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Dorfteller</h4>
                            <p id="dish-price">18,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GYROS, SCHWEINESTEAK, BIFTEKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Bauernteller</h4>
                            <p id="dish-price">18,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GYROS, SOUVLAKI, 2 SUZUKAKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Hausteller</h4>
                            <p id="dish-price">18,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GYROS, SCHWEINESTEAK, SOUVLAKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gartenteller</h4>
                            <p id="dish-price">19,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GYROS, PUTENSTEAK, SPIESS, BIFTEKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Knoblauchteller</h4>
                            <p id="dish-price">19,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GYROS, SPIESS, STEAK, SUZUKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Mixteller</h4>
                            <p id="dish-price">22,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GYROS, LENDCHEN, RUMPSTEAK, LAMMKOTELETT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Chefteller</h4>
                            <p id="dish-price">17,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GYROS, RINDERLEBER, 2 SUZUKAKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Grillteller</h4>
                            <p id="dish-price">18,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GYROS, PUTENSTEAK, LEBER, SUZUKI</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Lammteller</h4>
                            <p id="dish-price">31,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">LAMMKRONEN, LAMMFILLET, LAMMSTEAK</p>
                    </div>
            `
        };

        menuLink7.addEventListener('click', changeToCategory7);

        function changeToCategory7 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink7.style.textDecoration = 'underline';
            menuLink7.style.textDecorationThickness = '1px';
            menuLink7.style.textUnderlineOffset = '6px';
            menuContent.innerHTML = `
            <div class="menu-category" id="beilagen-sossen">
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Pommes / Kroketten / Gemüsereis</h4>
                            <p id="dish-info">4,00€</p>
                        </div>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Bandnudeln/ Salzkartoffeln</h4>
                            <p id="dish-info">4,00€</p>
                        </div>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Dicke Bohnen</h4>
                            <p id="dish-info">6,50€</p>
                        </div>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Pfeffersosse / Kräuterbutter / Chilisosse</h4>
                            <p id="dish-info">2,50€</p>
                        </div>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Sauce Béarnaise</h4>
                            <p id="dish-info">2,50€</p>
                        </div>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Brot</h4>
                            <p id="dish-info">1,50€</p>
                        </div>
                    </div>
            `
        };

        menuLink9.addEventListener('click', changeToCategory9);
        
        function changeToCategory9 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink9.style.textDecoration = 'underline';
            menuLink9.style.textDecorationThickness = '1px';
            menuLink9.style.textUnderlineOffset = '6px';
            menuContent.innerHTML = `
            <div class="menu-category" id="2-personen">
                        <h4 id="dish-info">MIT POMMES, GEMÜSEREIS, UND SALAT</h4>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Grillplatte mit Tzatziki</h4>
                            <p id="dish-price">44,00€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GYROS, 2 RINDERLEBER, 2 SCHWEINESTEAK, 2 SUZUKAKIA</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Hausplatte mit Tzatziki</h4>
                            <p id="dish-price">48,00€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">2 SOUVLAKI, 2 RUMPSTEAK, 2 SUZUKAKIA, GYROS</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gartenplatte mit Tzatziki</h4>
                            <p id="dish-price">46,00€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">2 PUTENSTEAKS, 2 SOUVLAKI, 2 HACKSTEAKS, GYROS</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Bauernplatte mit Tzatziki</h4>
                            <p id="dish-price">64,00€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">2 LAMMSPIESSE, 2 LAMMKRONEN, 4 LAMMFILETS</p>
                    </div>
            `
        };

        menuLink8.addEventListener('click', changeToCategory8);

        function changeToCategory8 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink8.style.textDecoration = 'underline';
            menuLink8.style.textDecorationThickness = '1px';
            menuLink8.style.textUnderlineOffset = '6px';
            menuContent.innerHTML = `
            <div class="menu-category" id="deutsche-dish">
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Schnitzel</h4>
                            <p id="dish-price">15,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">VOM SCHWEIN MIT SOSSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Hänchenbrustfillet</h4>
                            <p id="dish-price">18,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">IN KÄSESOSSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Putensteak</h4>
                            <p id="dish-price">18,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT KÄSESOSSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Putensteak</h4>
                            <p id="dish-price">18,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT PFEFFERRAHMSOSSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Putenschnitzel</h4>
                            <p id="dish-price">17,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT SOSSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Schweinefillet</h4>
                            <p id="dish-price">19,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT PFEFFERRAHMSOSSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Schweinefillet</h4>
                            <p id="dish-price">19,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT KRÄUTERBUTTER</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Arg. Rumpsteak ca. 250 grams</h4>
                            <p id="dish-price">28,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT KRÄUTERBUTTER</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Arg. Rumpsteak ca. 250 grams</h4>
                            <p id="dish-price">28,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT RÖSTZWIEBELN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Arg. Rumpsteak ca. 250 grams</h4>
                            <p id="dish-price">28,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT PFEFFERRAHMSOSSE</p>
                    </div>
            `
        };

        menuLink10.addEventListener('click', changeToCategory10);

        function changeToCategory10 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink10.style.textDecoration = 'underline';
            menuLink10.style.textDecorationThickness = '1px';
            menuLink10.style.textUnderlineOffset = '6px';
            menuContent.innerHTML = `
            <div class="menu-category" id="kleine-dish">
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Putenschnitzel</h4>
                            <p id="dish-price">15,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT BRATENSOSSE, POMMES, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Schweineschnitzel</h4>
                            <p id="dish-price">14,00€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT BRATENSOSSE, POMMES, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gyros mit Tzatziki</h4>
                            <p id="dish-price">14,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">POMMES UND SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gefüllter Spiess</h4>
                            <p id="dish-price">15,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT KÄSEFÜLLUNG, POMMES, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Schweinefillet</h4>
                            <p id="dish-price">15,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT PFEFFERRAHMSOSSE, POMMES, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Rinderleber</h4>
                            <p id="dish-price">14,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT RÖSTZWIEBELN, POMMES, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Souvlaki</h4>
                            <p id="dish-price">14,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">FLEISCHSPIESS MIT POMMES UND SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Bifteki</h4>
                            <p id="dish-price">14,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">HACKSTEAK MIT KÄSEFÜLLUNG, POMMES, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Suzukakia</h4>
                            <p id="dish-price">14,50€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">HACKRÖLLCHEN, POMMES, SALAT</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Rotbarschfilet</h4>
                            <p id="dish-price">16,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GEGRILLT MIT TZATZIKI, GEMÜSEREIS, SALAT</p>
                    </div>
            `
        };

        menuLink11.addEventListener('click', changeToCategory11);

        function changeToCategory11 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink11.style.textDecoration = 'underline';
            menuLink11.style.textDecorationThickness = '1px';
            menuLink11.style.textUnderlineOffset = '6px';
            menuContent.innerHTML = `
            <div class="menu-category" id="desserts">
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gemischtes Eis</h4>
                            <p id="dish-price">6,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GARNIERT MIT EISWAFFELN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Gemischtes Eis & Sahne</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GARNIERT MIT EISWAFFELN</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Himbeertraum</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">VANILLAEIS, SCHOKOSOSSE, & SAHNE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Schokokuss</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">VANILLAEIS, SCHOKOSOSSE, & SAHNE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Caramel-Becher</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">VANILLAEIS, CARAMELSOSSE, & SAHNE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Advokat-Becher</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">VANILLAEIS, EIERLIKÖR, & SAHNE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Revani</h4>
                            <p id="dish-price">6,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">GRISSKUCHEN MIT VANILLAEIS, HIMBEERSOSSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Crêpes - Schoko</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT VANILLAEIS & SCHOKOSOSSE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Galaktoburiko</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">BLÄTTERTEIG, VANILLACREMEFÜLLUNG, VANILLAREIS</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Joghurt mit Honig & Nüssen</h4>
                            <p id="dish-price">6,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info"></p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Schokoladen-Soufle</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">MIT VANILLAEIS & FRÜCHTE</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Affogato</h4>
                            <p id="dish-price">4,60€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">ESPRESSO MIT VANILLAEIS</p>
                        <div class="specialty-dishdiv">
                            <h4 id="specialty-title">Tiramisu</h4>
                            <p id="dish-price">7,90€</p>
                        </div>
                        <hr id="menuline">
                        <p id="dish-info">HAUSGEMACHT - MEHR GEHT EINFACH NICHT</p>
                    </div>
            `
        };

        menuLink12.addEventListener('click', changeToCategory12);

        function changeToCategory12 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink12.style.textDecoration = 'underline';
            menuLink12.style.textDecorationThickness = '1px';
            menuLink12.style.textUnderlineOffset = '6px';  
            menuContent.innerHTML = `
            <div class="menu-category" id="alkohol">
                <h4 id="specialty-title">Weine aus Deutschland</h4>
                <hr id="menuline">
                <br>
                <br>
                <br>
                <h4 id="dish-info">BETSCHGRÄBLER, Riesling, trocken (aus Baden)</h4>
                <h4 id="dish-info">SASBACHWALDENER, Weissherbst</h4>
                <h4 id="dish-info">SASBACHWALDENER, Rotwein, trocken</h4>
                <h4 id="dish-info">FREISCHÜTZ, Weisswein, trocken (aus Baden)</h4>
                <h4 id="dish-info">DEIDESHEIMER HOFSTÜCK, Rotwein, halbtrocken (aus Pfalz)</h4>
                <h4 id="dish-info">RIESLINGSCHORLE</h4>
                <h4 id="dish-info">WEINSCHORLE, weiss</h4>
                <h4 id="dish-info">WEINSCHORLE, rot</h4>
                <br>
                <br>
                <br>
                <h4 id="specialty-title">Weine aus Griechenland</h4>
                <hr id="menuline">
                <br>
                <br>
                <br>
                <h4 id="dish-info">RETZINA , weiss, geharzt, trocken</h4>
                <h4 id="dish-info">MAKEDONIKOS, weiss, fruchtig, halbtrocken</h4>
                <h4 id="dish-info">DEMESTICA, weiss, trocken</h4>
                <h4 id="dish-info">IMIGLIKOS, weiss, lieblich</h4>
                <h4 id="dish-info">MOSCHOFILERO, weiss, hochqualität, trocken</h4>
                <h4 id="dish-info">SAMOS, weiss, Likörwein</h4>
                <h4 id="dish-info">RODOS, rot, hochqualität, lieblich</h4>
                <h4 id="dish-info">MAKEDONIKOS, rot, fruchtig, halbtrocken</h4>
                <h4 id="dish-info">DEMESTICA, rot, trocken</h4>
                <h4 id="dish-info">NEMEA, rot, hochqualität, trocken</h4>
                <h4 id="dish-info">IMIGLIKOS, rot, süss</h4>
                <h4 id="dish-info">NAOUSSA, rot, hochqualität, trocken </h4>
                <h4 id="dish-info">MAVRODAPHNI, rot, Likörwein</h4>
                <h4 id="dish-info">MAKEDONIKOS, rose, fruchtig, halbtrocken</h4>
                <h4 id="dish-info">AMYNTEON, hochqualität, fruchtig, trocken</h4>
                <br>
                <br>
                <br>
                <h4 id="specialty-title">Prosecco & Champagner</h4>
                <hr id="menuline">
                <br>
                <br>
                <br>
                <h4 id="dish-info">PROSECCO MIT CRODINO</h4>
                <h4 id="dish-info">PROSECCO MIT MARTINI & BLUE CURACAO</h4>
                <h4 id="dish-info">GLAS PROSECCO</h4>
                <h4 id="dish-info">PROSECCO</h4>
                <br>
                <br>
                <br>
                <h4 id="specialty-title">Biere vom Eichbaum</h4>
                <hr id="menuline">
                <br>
                <br>
                <br>
                <h4 id="dish-info">RADEBERGER PILSNER VOM FASS</h4>
                <h4 id="dish-info">SCHÖFFERHOFER HEFEWEIZEN VOM FASS</h4>
                <h4 id="dish-info">KRUSOVICE VOM FASS</h4>
                <h4 id="dish-info">SCHÖFFERHOFER BANANENWEIZEN</h4>
                <h4 id="dish-info">RADLER</h4>
                <h4 id="dish-info">SCHÖFFERHOFER KRISTALLWEIZEN</h4>
                <h4 id="dish-info">SCHÖFFERHOFER DUNKLES HEFEWEIZEN</h4>
                <h4 id="dish-info">COLA-BIER </h4>
                <h4 id="dish-info">CLAUSTHALER, extra herb (Alkoholfrei)</h4>
                <h4 id="dish-info">SCHÖFFERHOFER HEFEWEIZEN (Alkoholfrei)</h4>
                <br>
                <br>
                <br>
                <h4 id="specialty-title">Apertifs & Spirituosen</h4>
                <hr id="menuline">
                <br>
                <br>
                <br>
                <h4 id="dish-info">OUZO, OUZO PLOMARI</h4>
                <h4 id="dish-info">JOHNNIE WALKER</h4>
                <h4 id="dish-info">JACK DANIELS</h4>
                <h4 id="dish-info">WHISKEY COLA</h4>
                <h4 id="dish-info">VODKA LEMON</h4>
                <h4 id="dish-info">BACARDI COLA</h4>
                <h4 id="dish-info">MARTINI</h4>
                <h4 id="dish-info">CAMPARI MARACUJA</h4>
                <h4 id="dish-info">CAMPARI ORANGE</h4>
                <h4 id="dish-info">RAMAZZOTTI</h4>
                <h4 id="dish-info">FERNET BRANCA</h4>
                <h4 id="dish-info">BAILEYS</h4>
                <h4 id="dish-info">METAXA 5 / 7 / 12 JAHRE</h4>
                <h4 id="dish-info">BATIDA KIRSCH GIN LEMON</h4>  
            </div>
            `
        };

        menuLink13.addEventListener('click', changeToCategory13);

        function changeToCategory13 () {
            menuLink1.style.textDecoration = 'none';
            menuLink2.style.textDecoration = 'none';
            menuLink3.style.textDecoration = 'none';
            menuLink4.style.textDecoration = 'none';
            menuLink5.style.textDecoration = 'none';
            menuLink6.style.textDecoration = 'none';
            menuLink7.style.textDecoration = 'none';
            menuLink8.style.textDecoration = 'none';
            menuLink9.style.textDecoration = 'none';
            menuLink10.style.textDecoration = 'none';
            menuLink11.style.textDecoration = 'none';
            menuLink12.style.textDecoration = 'none';
            menuLink13.style.textDecoration = 'none';

            menuLink13.style.textDecoration = 'underline';
            menuLink13.style.textDecorationThickness = '1px';
            menuLink13.style.textUnderlineOffset = '6px';
            menuContent.innerHTML = `
            <div class="menu-category" id="alkoholfrei">
                <h4 id="specialty-title">Süsse Getränke</h4>
                <hr id="menuline">
                <br>
                <br>
                <br>
                <h4 id="dish-info">COCA-COLA, COLA-LIGHT</h4>
                <h4 id="dish-info">FANTA, SPEZI, SPRITE</h4>
                <h4 id="dish-info">BITTER LEMON</h4>
                <h4 id="dish-info">MINERAL WASSER / STILLES WASSER, Teinacher (flasche)</h4>
                <h4 id="dish-info">APFELSAFT, ORANGENSAFT, BANANENSAFT</h4>
                <h4 id="dish-info">APFELSCHORLE</h4>
                <br>
                <br>
                <br>
                <h4 id="specialty-title">Heisse Getränke</h4>
                <hr id="menuline">
                <br>
                <br>
                <br>
                <h4 id="dish-info">GLAS TEE</h4>
                <h4 id="dish-info">TASSE KAFFEE CREME</h4>
                <h4 id="dish-info">TASSE KAFFEE CREME MIT BAILEYS</h4>
                <h4 id="dish-info">TASSE ESPRESSO</h4>
                <h4 id="dish-info">ESPRESSO MACCHIATTO</h4>
                <h4 id="dish-info">SCHOKOLADENGETRÄNK MIT SAHNE</h4>
                <h4 id="dish-info">CAPPUCCINO MIT GESCHÄUMTER MILCH</h4>
                <h4 id="dish-info">LATTE MACCHIATTO MIT AROMA</h4>
                <h4 id="dish-info">LATTE MACCHIATTO</h4>
            </div>
            `
        };

    }

    if (window.location.pathname === '/galerie.html') {

        // change gallery UI Layout in CSS
        // card animation for gallery pictures


        // bestseller cards animation
        const galleryLeft = document.getElementById("gallery-left");
        const galleryMain = document.getElementById("gallery-main");
        const galleryRight = document.getElementById("gallery-right");
        const galleryHidden1 = document.getElementById("hidden-pic1");
        const galleryHidden2 = document.getElementById("hidden-pic2");
        const galleryHidden3 = document.getElementById("hidden-pic3");
        const galleryHidden4 = document.getElementById("hidden-pic4");
        const galleryHidden5 = document.getElementById("hidden-pic5");
        const galleryHidden6 = document.getElementById("hidden-pic6");
        const galleryHidden7 = document.getElementById("hidden-pic7");


    
        // initial images
        galleryLeft.style.backgroundImage = 'url(assets/gallery-2.jpg)';
        galleryMain.style.backgroundImage = 'url(assets/gallery-main.jpg)';
        galleryRight.style.backgroundImage = 'url(assets/gallery-3.jpg)';
        galleryHidden1.style.backgroundImage = 'url(assets/gallery-4.jpg)';
        galleryHidden2.style.backgroundImage = 'url(assets/gallery-5.jpg)';
        galleryHidden3.style.backgroundImage = 'url(assets/gallery-6.jpg)';
        galleryHidden4.style.backgroundImage = 'url(assets/gallery-7.jpg)';
        galleryHidden5.style.backgroundImage = 'url(assets/gallery-8.jpg)';
        galleryHidden6.style.backgroundImage = 'url(assets/gallery-9.jpg)';
        galleryHidden7.style.backgroundImage = 'url(assets/gallery-10.jpg)';

    
        // mouse events for mouse and touch move for touch devices
        galleryMain.addEventListener('mousedown', startDrag);
        galleryMain.addEventListener('touchstart', startDrag, { passive: false });
    
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('touchmove', onDrag, { passive: false });
    
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);

        let isDragging = false;
        let startX = 0;
    
        function startDrag(event) {
            isDragging = true;
            startX = event.touches ? event.touches[0].clientX : event.clientX;  // initial x position
            // event.touches = list of touch objects
            // event.touches[0].clientX = first touch point relative to viewport
            // event.clientX = fallback or initial position
            event.preventDefault();
        }
    
        function onDrag(event) {
            if (!isDragging) return;
    
            const currentX = event.touches ? event.touches[0].clientX : event.clientX; // current x position
            const moveX = currentX - startX; // distance moved
    
            galleryMain.style.transform = `translateX(${moveX}px) scale(1.2)`;
    
            if (moveX > 100) {
                rotateImages('right');
                endDrag();
            } else if (moveX <- 100) {
                rotateImages('left');
                endDrag();
            }
        }
    
        function endDrag() {
            if (!isDragging) return;
    
            isDragging = false;
            galleryMain.style.transform = 'translateX(0) scale(1.2)'; // reset image position
        }
    
        galleryLeft.addEventListener("click", function() {
            rotateImages('left');
        });
    
        galleryRight.addEventListener("click", function() {
            rotateImages('right');
        });
    
        function rotateImages(direction) {
            let leftGallerypic = galleryLeft.style.backgroundImage;
            let mainGallerypic = galleryMain.style.backgroundImage;
            let rightGallerypic = galleryRight.style.backgroundImage;
            let hiddenPic1 = galleryHidden1.style.backgroundImage;
            let hiddenPic2 = galleryHidden2.style.backgroundImage;
            let hiddenPic3 = galleryHidden3.style.backgroundImage;
            let hiddenPic4 = galleryHidden4.style.backgroundImage;
            let hiddenPic5 = galleryHidden5.style.backgroundImage;
            let hiddenPic6 = galleryHidden6.style.backgroundImage;
            let hiddenPic7 = galleryHidden7.style.backgroundImage;

    
            if (direction === 'left') {
                galleryMain.style.backgroundImage = leftGallerypic;
                galleryRight.style.backgroundImage = mainGallerypic;
                galleryHidden1.style.backgroundImage = rightGallerypic;
                galleryHidden2.style.backgroundImage = hiddenPic1;
                galleryHidden3.style.backgroundImage = hiddenPic2;
                galleryHidden4.style.backgroundImage = hiddenPic3;
                galleryHidden5.style.backgroundImage = hiddenPic4;
                galleryHidden6.style.backgroundImage = hiddenPic5;
                galleryHidden7.style.backgroundImage = hiddenPic6;
                galleryLeft.style.backgroundImage = hiddenPic7;
            } else if (direction === 'right') {
                galleryMain.style.backgroundImage = rightGallerypic;
                galleryLeft.style.backgroundImage = mainGallerypic;
                galleryHidden1.style.backgroundImage = leftGallerypic;
                galleryHidden2.style.backgroundImage = hiddenPic1;
                galleryHidden3.style.backgroundImage = hiddenPic2;
                galleryHidden4.style.backgroundImage = hiddenPic3;
                galleryHidden5.style.backgroundImage = hiddenPic4;
                galleryHidden6.style.backgroundImage = hiddenPic5;
                galleryHidden7.style.backgroundImage = hiddenPic6;
                galleryRight.style.backgroundImage = hiddenPic7;
            }
        }
    }


    if (window.location.pathname === '/reservieren.html') {


        const submitBtn = document.getElementById('formbtn-submit');
        const form = document.getElementById('reservation-form');
        const successMessage = document.getElementById('form-success');
        const inputs = form.querySelectorAll('input[required]');
        const errorMessages = {
            'fname': 'Bitte geben Sie Ihren Vornamen ein.',
            'lname': 'Bitte geben Sie Ihren Nachnamen ein.',
            'email': 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
            'kontakt': 'Bitte geben Sie eine gültige Kontaktnummer ein.',
            'guest': 'Bitte geben Sie die Anzahl der Gäste ein.',
            'sched': 'Bitte wählen Sie ein Datum und eine Uhrzeit aus.'
        };

        function validateInput(input) {
            const id = input.id.replace('form-', '');
            const errorDiv = document.getElementById('error-' + id);
            if (!input.validity.valid) {
                input.classList.add('invalid');
                errorDiv.textContent = errorMessages[id];
                errorDiv.style.display = 'block';
                return false;
            } else {
                input.classList.remove('invalid');
                errorDiv.textContent = '';
                errorDiv.style.display = 'none';
                return true;
            }
        }

        function validateForm() {
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            submitBtn.disabled = !isValid;
            return isValid;
        }

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
                validateForm();
            });
        });

        submitBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if (validateForm()) {
                const formData = new FormData(form);
                const action = form.action;
                
                fetch(action, {
                    method: 'POST',
                    body: formData,
                }).then(response => response.text())
                  .then(text => {
                      console.log(text);  // Log the response text
                      if (text.includes('Success')) {
                          successMessage.style.display = 'block';
                          form.reset();
                          setTimeout(() => {
                              successMessage.style.display = 'none';
                          }, 5000);
                      } else {
                          alert('Es gab ein Problem mit der Übermittlung. Bitte versuchen Sie es später noch einmal.');
                      }
                  }).catch(error => {
                      console.error('Error:', error);
                      alert('Es gab ein Problem mit der Übermittlung. Bitte versuchen Sie es später noch einmal.');
                  });
            }
        });
        

        // Restrict date input
        const dateInput = document.getElementById('form-sched');
        const today = new Date();
        const sixMonthsLater = new Date(today);
        sixMonthsLater.setMonth(today.getMonth() + 6);
        dateInput.min = today.toISOString().slice(0, 16);
        dateInput.max = sixMonthsLater.toISOString().slice(0, 16);

        
    }
});

// submit button - sending infos in auto-email
// submit button - saving data to google sheet











