<template>
  <CForm v-if="!otp_verified" @submit.prevent="send_otp" method="POST">
    <CInput v-model="mobile" type="tel" required placeholder="Phone"></CInput>
    <div v-if="otp_sent">
      <CInput
        v-model="otp"
        type="number"
        placeholder="Enter OTP sent to your Phone No"
      ></CInput>
      <CButton @click="verify_otp" color="success" block>Verify</CButton>
    </div>
    <CButton v-else type="submit" color="success" block>Send OTP</CButton>
  </CForm>
</template>

<script>
export default {};
</script>

<style>
</style>
