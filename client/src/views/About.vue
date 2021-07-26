<template>
  <div class="about">
    <h1>This is an about page</h1>

    <br>

    <small>Made by <a href="https://www.linkedin.com/in/josip-leko-00284219a/" target="_blank" rel="noopener noreferrer">Josip Leko</a></small>

    <br><br>

    <p style="text-align: left;">Website is made using MEVN stack ie MongoDB, Express.js, Vue.js and Node.js
      <br>
      I used MongoDB as it's simple and easy to implement in Node apps. CRUD operations
      are implemented with the Express API. New items can be created and deleted, only
      attributes necessary are name and price. They can be added with postman or insomnia, no ui
      <br><br>
      Items are fetched from database with axios and displayed on home page usign vue single
      file components, they can be added to cart. VueX is used for state management and it contains
      items and optional promo codes. Data is persistent and stays after you leave the page.
      <br>
      You can enter promo codes in your cart. when done adding
      items, you can checkout with basic info, email, address and credit card number.
      <br>
      after successful checkout, you can see your order summary and continue/exit shopping.

      <br><br>
      I went for a clutterfree ui, nothing special, so everything can be easily understandable and
      also I added comments for additional info and code maintainability. For additional
      questions message me on social media or josipleko333@gmail.com
      <br><br>
      <b>I had a blast creating this! Cheers to Kodius team! 😄</b>
    </p>
  </div>
</template>
