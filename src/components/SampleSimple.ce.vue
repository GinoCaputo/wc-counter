<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  name: '',
  cardNumber: '',
  cvc: '',
  expirationDate: ''
});
const validationErrors = reactive({
  name: '',
  cardNumber: '',
  cvc: '',
  expirationDate: ''
});
const validateCardNumber = () => {
  // Remove all non-digit characters
  let cardNumber = String(form.cardNumber)
  const digitsOnly = cardNumber.replace(/\D+/g, '');
  form.cardNumber = digitsOnly; // Update the form with cleaned input
  // Basic validation for length of card number
  if (digitsOnly.length >= 13 && digitsOnly.length <= 19) {
    validationErrors.cardNumber = '';
  } else {
    validationErrors.cardNumber = 'Card number must be between 13 to 19 digits';
  }
};
// Name validation logic
const validateName = () => {
  validationErrors.name = form.name.trim().length > 0 ? '' : 'Name is required';
};

// CVC validation logic
const validateCVC = () => {
  const cvcPattern = /^\d{3,4}$/;
  validationErrors.cvc = cvcPattern.test(form.cvc) ? '' : 'CVC must be 3 or 4 digits';
};

// Expiration date validation logic
const validateExpirationDate = () => {
  const expirationDatePattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  const matches = form.expirationDate.match(expirationDatePattern);
  if (matches) {
    const today = new Date();
    const expYear = Number(matches[2]); // Convert string to number
    const expMonth = Number(matches[1]) - 1; // Convert string to number and adjust month for 0 index
    const expDate = new Date(Number(`20${expYear}`), expMonth);
    validationErrors.expirationDate = (expDate > today) ? '' : 'Expiration date must be in the future';
  } else {
    validationErrors.expirationDate = 'Expiration date must be in MM/YY format';
  }
}
const filterNumeric = (event) => {
  const value = event.target.value;
  form.cardNumber = value.replace(/\D/g, '');
};
// Mask the expiration date input
const maskExpirationDate = (event) => {
  let value = event.target.value;
  const cleaned = value.replace(/\D+/g, '');
  
  // Break the string into parts based on the expected MM/YY format
  let month = cleaned.substring(0, 2);
  let year = cleaned.substring(2, 4);
  
  // Reconstruct the value, inserting a slash where appropriate
  value = month + (year ? '/' + year : '');
  form.expirationDate = value;
};
const validateForm = () => {
  validateCardNumber();
  validateName();
  validateCVC();
  validateExpirationDate();
}

const submitForm = () => {
  validateForm();
  // ... call validation for other fields ...

  if (!Object.values(validationErrors).some(Boolean)) {
    // If there are no validation errors, proceed with the submission
    console.log('Form submitted', form);
  } else {
    // Handle the invalid form case
    console.log('Validation errors', validationErrors);
  }
};
</script>

<template>
  <div class="container">
    <h2>Tokenization form</h2>
    <form @submit.prevent="submitForm">
      <!-- Name Field -->
      <div class="mb-4">
        <label for="name" class="label">Name</label>
        <input type="text" id="name" v-model.trim="form.name" @blur="validateName"
              :class="{'border-red-500': validationErrors.name}" required>
        <p v-if="validationErrors.name">{{ validationErrors.name }}</p>
      </div>

      <!-- CC Field -->
      <div class="mb-4">
        <label for="cvc" class="label">Credit Card</label>
        <input type="number" placeholder="Credit Card" v-model.trim="form.cardNumber" @blur="validateCardNumber"
               :class="{'border-red-500': validationErrors.cardNumber}" required>
        <p v-if="validationErrors.cardNumber">{{ validationErrors.cardNumber }}</p>
      </div>

      <!-- CVC Field -->
      <div class="mb-4">
        <label for="cvc" class="label">CVC</label>
        <input type="text" id="cvc" v-model="form.cvc" @input="filterNumeric" @blur="validateCVC"
              :class="{'border-red-500': validationErrors.cvc}" required>
        <p v-if="validationErrors.cvc">{{ validationErrors.cvc }}</p>
      </div>

      <!-- Expiration Date Field -->
      <div class="mb-4">
        <label for="expirationDate" class="label">Expiration date</label>
        <input type="text" id="expirationDate" v-model="form.expirationDate" @input="maskExpirationDate"  @blur="validateExpirationDate"
              :class="{'border-red-500': validationErrors.expirationDate}" required>
        <p v-if="validationErrors.expirationDate">{{ validationErrors.expirationDate }}</p>
      </div>
      <button>Try tokenization</button>
    </form>
  </div>
</template>

<style>
</style>