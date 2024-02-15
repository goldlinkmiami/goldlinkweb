import Experience from "./Experience";
import EventEmitter from "./Utils/EventEmitter";
import gsap from "gsap";

export default class LoadingScreen extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.body = document.querySelector("body");

    this.loader = document.createElement("div");
    this.loader.classList.add("loadingScreen");
    this.loader.innerHTML = `
        <div class="loadingScreenLogo">
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
          <div class="line"></div>
          <div class="middle">
            <div class="middle-line"></div>
            <div class="middle-line"></div>
            <div class="middle-line"></div>
            <div class="middle-line"></div>
            <div class="middle-line"></div>
            <div class="middle-line"></div>
            <div class="middle-line"></div>
          </div>
          <div class="line"></div>
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
        <img src="/textures/newLogo-white.webp" alt="" />

        <div class="loader"></div>

    `;

    this.body.prepend(this.loader);
    //? nav
    this.nav = document.createElement("nav");
    this.nav.innerHTML = `<div class="nav-con">
        <a id="about" class="about" section="second" href="#2">About</a>
        <img class="logo" section="first" src="/textures/newLogo-gradient.webp" alt="" />
        <a id="investors" class="investors" section="third" href="#3"
          >Investors</a
        >
      </div>`;
    // console.log(this.loader);
    //? first Section

    this.firstSection = document.createElement("div");
    this.firstSection.classList.add("section");
    this.firstSection.id = "first";
    this.firstSection.innerHTML = `
      <div class="header">
        <h1>Embark on a journey with <br /><span>GoldLink Miami</span></h1>
        <h3>
          To establish an efficient gold trade system between the DRC and USA while putting an end to the exploitation of mining communities.
        </h3>
      </div>`;

    //?second Section

    this.secondSection = document.createElement("div");
    this.secondSection.classList.add("section");
    this.secondSection.id = "second";
    this.secondSection.innerHTML = `
    <div class="second-header">
      <h1>
        Ethical Gold Sourcing
      </h1>
      <h3> 
          We pride ourselves on extracting gold exclusively from legal sources in Africa,
          prioritizing the  <span> Democratic Republic of Congo. </span>
        <br>
        <br>
          Our team personally visits and purchases gold from approved mid-scale mines in DR Congo.
        <br>
        <br>
          We then sell the gold to our chosen refinery in Miami, USA,
          and recieve the funds within minutes, readty to go back and repeat the process.
        <br>
        <br>
        We work with established and well-connected law firms, customs officers, transport and security companies in both the exporting and importing countries to take care of all the legalities and ensure a smooth, safe journey of our gold out of DR Congo and into the US.
        

      </h3>
    </div>  `;

    //? thirdSection

    this.thirdSection = document.createElement("div");
    this.thirdSection.classList.add("section");
    this.thirdSection.id = "third";
    this.thirdSection.innerHTML = `<div class="third-header>
        <h1>
          Investor Connection
        </h1>
          <br>
        <h3>
            At GoldLink Miami, we specialize in bringing together investors eager to capitalize on the gold market.
             Whether you're a seasoned investor or new to the industry, we provide opportunities to participate in the thriving gold trade.
        </h3>
          <br>
          <br>
         <h1>
          Strategic Sales in the United States
        </h1>
         <br>
        <h3>
          GoldLink Miami seamlessly facilitates the sale of gold within the United States.
           Leveraging our network of trusted buyers, we ensure that your investment yields profitable returns.
        </h3>
        <br>
        <br>
        <h1>
          Comprehensive Gold Procurement
        </h1>
        <br>
        <h3>
          Our services encompass the end-to-end process of acquiring legal gold.
           From meticulous procurement to thorough verification, we handle every aspect to ensure the authenticity and quality of the gold.
        </h3>
      </div> `;

    this.thirdSection.innerHTML = `
      <div class="third-header">
          <h1>
          Investor Connection
        </h1>

        <h3>
            At GoldLink Miami, we specialize in bringing together investors eager to capitalize on the gold market.
             Whether you're a seasoned investor or new to the industry, we provide opportunities to participate in the thriving gold trade.
        </h3>

         <h1>
          Strategic Sales in the United States
        </h1>

        <h3>
          GoldLink Miami seamlessly facilitates the sale of gold within the United States.
           Leveraging our network of trusted buyers, we ensure that your investment yields profitable returns.
        </h3>

        <h1 class="display">
          Comprehensive Gold Procurement
        </h1>

        <h3 class="display">
          Our services encompass the end-to-end process of acquiring legal gold.
           From meticulous procurement to thorough verification, we handle every aspect to ensure the authenticity and quality of the gold.
        </h3>

      

        <div class="contact-con">
          <button class="contact" href="https://www.youtube.com/watch?v=X7IBa7vZjmo&t=554s"> 
            <a href="mailto:office@goldlinkmiami.com"> 
              Contact Us
            </a>  
          </button> 
          <p>GoldLink Miami LLC</p>
          <p>1000 5th Street #200, Miami Beach, Florida, United States of America</p>
          <p>office@goldlinkmiami.com</p>
          <p>+1 (774) 339-9716</p>
        </div>
      
      </div> 
       <footer> 
          COPYRIGHT © 2024 GOLDLINK MIAMI - ALL RIGHTS RESERVED. 
        </footer>
        `;

    //!!!!!

    this.resources.on("resourcesReady", () => {
      gsap.to(this.loader, {
        duration: 2,
        opacity: 0,
        y: -500,
        onCompleteParams: [
          this.loader,
          this.body,
          this.nav,
          this.firstSection,
          this.secondSection,
          this.thirdSection,
          gsap,
        ],
        onComplete: this.displayNone,
      });
    });
  }

  displayNone(
    loader,
    body,
    nav,
    firstSection,
    secondSection,
    thirdSection,
    gsap
  ) {
    body.append(nav);
    body.append(firstSection);
    body.append(secondSection);
    body.append(thirdSection);

    loader.style.display = "none";

    gsap.to(nav, {
      duration: 0.75,
      y: 80,
      opacity: 1,
    });
    gsap.to(firstSection, {
      duration: 0.75,
      x: 0,
      opacity: 1,
    });
  }
}
