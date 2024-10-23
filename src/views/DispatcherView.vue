<template>
  <section class="dispatchStyle">
    <div id="orders">
      <div id="orderList">
      <dic v-for="(order, index) in orders" :key="index">
      <section id="aCustomerOrder">

            # {{ order.orderId }}: {{ getName(order) }}
            <section v-for="(item, amount) in order.orderItems" :key="amount">
              {{ amount }}: {{ item }}
            </section>

          <section>{{ remainingInfo(order) }}</section>
          <hr class="smaller" />
        </section>
       </dic>

      <button class="clearButton" v-on:click="clearQueue">Clear Queue</button>
    </div>
    <div
        id="dots"
        v-bind:style="{
          background: 'url(' + require('/public/img/polacks.jpg') + ')',
        }"
      >
        <div
          v-for="(order, key) in orders"
          v-bind:style="{
            left: order.details.x + 'px',
            top: order.details.y + 'px',
          }"
          v-bind:key="'dots' + key"
        >
          {{ key }}
        </div>
      </div>
    </div>
  </section>
</template>



  <script>
  import io from 'socket.io-client'
  const socket = io();
  
  export default {
    name: 'DispatcherView',
    data: function () {
      return {
        orders: null
      }
    },
    created: function () {
      socket.on('currentQueue', data =>
        this.orders = data.orders);
    },
    methods: {
      clearQueue: function () {
        socket.emit('clearQueue');
      },
      getName: function (order) {
      return order.givenInfo[0];
    },
    remainingInfo: function (order) {
      return order.givenInfo.splice(1, 3).join(",  ");
    },
    }
  }
  </script>






  <style>
  #orderList {
    z-index: 2;
    top:1em;
    left:1em;
    position: absolute;
    color:black;
    padding: 1em;
    background: rgba(255,255,255, 0.5);
  }

  #dots {
    position: relative;
    cursor: crosshair;
    padding: 0;
    margin: 0;
    background-repeat: no-repeat;
    height: 1078px;
    width:1920px;
  }
  

  #dots div {
    color: white;
    width:20px;
    height:20px;
    text-align: center;
    position: absolute;
    background: black;
    
    border-radius: 10px;
    
  }
  </style>
  