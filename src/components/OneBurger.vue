<template>
  <div class="box a">
    <img :src="car.img || 'default.jpg'" :title="car.name || 'Unknown car'" :alt="car.name || 'Unknown car'" />
    <h1 class="name">{{ car.name || 'Unknown Car' }}</h1>
    <div class="Specifications">
      <ul>
        <li>Horsepower: {{ car.horsepower || 'N/A' }}</li>
        <li>{{ car.price || 'N/A' }}</li>
        <li>{{ car.category || 'N/A' }}</li>
        <li>{{ is_Electric(car.electric) }}</li>
      </ul>
    </div>
    <section class="Buttons">
      <button v-on:click="increase">Add to basket</button>
      <button v-on:click="decrease">Remove from basket</button>
      <p class="amount" v-if="amountOrdered">Amount: {{ amountOrdered }} </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'OneBurger',
  props: {
    car: {
      type: Object,
      required: true,
      default: () => ({
        img: 'default.jpg',
        name: 'Unknown car',
        horsepower: 'N/A',
        price: 'N/A',
        category: 'N/A',
        electric: false
      })
    }
  },
  data() {
    return {
      amountOrdered: 0,
    };
  },
  methods: {
    is_Electric(electric) {
      return electric ? 'Electric' : 'Combustion';
    },
    increase() {
      this.amountOrdered++;
      this.$emit('orderedCar', {
        name: this.car.name,
        amount: this.amountOrdered,
      });
    },
    decrease() {
      if (this.amountOrdered > 0) {
        this.amountOrdered--;
        this.$emit('orderedCar', {
          name: this.car.name,
          amount: this.amountOrdered,
        });
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
}

.obs {
  font-weight: bold;
}

#sectiontwo {
  background-color: black;
  color: white;
  margin: 2em 2em; /* top/bottom, R/L */
  border: 2px dashed #557ef8;
  border-radius: 2em;
}

.wrapper {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 33% 33% 33%;
}

@media screen and (max-width: 800px) {
  h1 {
    font-size: 6vw;
  }
}
</style>
