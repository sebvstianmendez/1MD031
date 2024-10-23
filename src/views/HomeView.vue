<template>
  <div class="sectionone" id="sectionone">
      <header id="header"><h1 class="center-text">MZ Luxury Cars</h1></header>
      <img src="Taycan.jpeg" id="mainbg" alt="Porsche 911" title="Porsche 911">
  </div>
      
<main>
      <section class="sectiontwo" id="sectiontwo">
              <h2>Welcome to MZ Luxury Cars</h2><br>
              <p>Please choose your automobile</p>
      </section>
    
      <div class="wrapper">
          <OneBurger
              v-for="burger in burgers"
              v-bind:car="burger"
              v-bind:key="burger.name"
              v-on:orderedCar="addToOrder($event)"
          />
      </div>

      <section class="receipt">
        <div>
          <h3>Amount:</h3>
        </div>
        <p v-for="(amount, name) in orderedCars" :key="name">
            {{ name }}: {{ amount }}
        </p>
      </section>

      <section class="sectionthree" id="sectionthree">
          <h2>Delivery Information</h2>
          <p>Delivery instructions</p>
          <p>
              <label for="fullname">Full name</label><br>
              <input type="text" id="fullname" v-model="fullname" required minlength="1" placeholder="Full name"/>
          </p>
          <p> 
              <label for="email">E-mail</label><br>
              <input type="email" id="email" v-model="email" required minlength="1" placeholder="E-mail"/>
          </p>

          <p>
              <label for="payment">Payment method</label>
              <select id="payment" v-model="selected">
                  <option>Swish</option>
                  <option>Kontokort</option>
                  <option>Faktura</option>
                  <option>PayPal</option>
              </select>
          </p>

          <form>
              <h3>Gender</h3>
              <input type="radio" id="male" value="man" v-model="gender">
              <label for="male">Male</label><br>

              <input type="radio" id="female" value="female" v-model="gender">
              <label for="female">Female</label><br>

              <input type="radio" id="undefined" value="undefined" v-model="gender">
              <label for="undefined">Prefer not to answer</label><br>
          </form>

          <div>
              <h3>Please select your location:</h3>
              <section class="scroll">
                  <div
                    id="polacksbacken"
                    v-on:click="setLocation"
                    v-bind:style="{
                      background: 'url(/img/polacks.jpg)',
                    }"
                  >
                      <div
                        v-bind:style="{
                          left: this.location.x + 'px',
                          top: this.location.y + 'px',
                        }"
                      >
                        T
                      </div>
                  </div>
              </section>
          </div>
    
          <button v-on:click="submit">
              <img src="check.png" width="21" height="21"> Send Info
          </button>
      </section>

      <section class="sectionfour" id="sectionfour">
        <h1>About:</h1>
        <p>"MZ Luxury Cars 2023 Ltd."</p>
      </section>
</main>

<!-- Horisontal line -->
<hr>
<footer>&copy; 2023 MZ Luxury Cars Limited</footer>
</template>

<script>
import menu from "../assets/menu.json";
import OneBurger from '../components/OneBurger.vue'
import io from 'socket.io-client'
const socket = io();

export default {
name: "HomeView",
components: {
  OneBurger,
},

data() {
  return {
    burgers: menu,
    gender: "undefined",
    orderedCars: {},
    clientDetails: [],
    selected: "Swish",
    queNumber: 0,
    location: { x: 0, y: 0 },
    fullname: '',
    email: ''
  };
},

computed: {
  totalAmount() {
    let sum = 0;
    for (let amount of Object.values(this.orderedCars)) {
      sum += amount;
    }
    return sum;
  },
},

methods: {
  getOrderNumber() {
    return (this.queNumber += 1);
  },

  formInformation() {
    this.clientDetails = [
      this.fullname,
      this.email,
      this.gender,
      this.selected,
    ];
    console.log(this.clientDetails);
    return this.clientDetails;
  },

  addToOrder(event) {
    if (event.amount === 0) {
      delete this.orderedCars[event.name];
    } else {
      this.orderedCars[event.name] = event.amount;
    }
  },

  calculateAmount() {
    let sum = 0;
    for (let amount of Object.values(this.orderedCars)) {
      sum += amount;
    }
    return sum;
  },

  addOrder(event) {
    var offset = {
      x: event.currentTarget.getBoundingClientRect().left,
    };
    socket.emit("addOrder", {
      orderId: this.getOrderNumber(),
      details: {
        x: event.clientX - 10 - offset.x,
        y: event.clientY - 10 - offset.y,
      },
      orderItems: [this.fullname, this.orderedCars],
    });
    this.location.x = event.clientX - 10 - offset.x;
    this.location.y = event.clientY - 10 - offset.y;
  },

  setLocation(event) {
    var offset = {
      x: event.currentTarget.getBoundingClientRect().left,
      y: event.currentTarget.getBoundingClientRect().top,
    };
    this.location = {
      x: event.clientX - 10 - offset.x,
      y: event.clientY - 10 - offset.y,
    };
  },

  submit() {
    socket.emit("addOrder", {
      orderId: this.getOrderNumber(),
      details: { x: this.location.x, y: this.location.y },
      orderItems: this.orderedCars,
      givenInfo: this.formInformation(),
    });
  },
},
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
}

header {
  text-align: center;
  color: #000000;
  font-size: 5em;
  top: 5%;
}

.sectionthree,
.sectionone,
.receipt {
  background-color: #ADD8E6;
}

#sectionone {
  margin: 1em 1em;
  height: 30em;
  overflow: hidden;
  border: 2px dashed #557ef8;
  border-radius: 2em;
}

#sectiontwo {
  background-image: url("https://img.freepik.com/free-vector/blue-abstract-background_1393-339.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  margin: 1em 1em;
  border-radius: 2em;
  text-align: center;
  overflow: hidden;
}

#sectionthree {
  margin: 2em 2em;
  padding: 2em;
  border: 2px dashed #557ef8;
  border-radius: 2em;
}

button:hover {
  background-color: rgb(230, 230, 230);
  cursor: pointer;
}

#mainbg {
  opacity: 0.9;
  width: 100%;
  height: auto;
}

#header {
  text-align: center;
  position: absolute;
  margin: 0 auto;
  z-index: 1;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-130%);
  color: white;
}

.wrapper {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  justify-content: space-evenly;
  max-height: 900px;
}

.wrapper img {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

@media screen and (max-width: 800px) {
  h1 {
    font-size: 6vw;
  }
}

.scroll {
  height: 500px;
  width: 80%;
  overflow: scroll;
}

#polacksbacken {
  position: relative;
  width: 1920px;
  height: 1078px;
  margin: 0;
  padding: 0;
  cursor: crosshair;
}

#polacksbacken div {
  position: absolute;
  text-align: center;
  background: black;
  color: #ADD8E6;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
</style>
