<template>
  <div id="Board">   
    <EquipmentBoard />
  </div>
</template>

<script setup>
import EquipmentBoard from '@/views/apps/components/EquipmentBoard.vue'
</script>

<style>
#Board {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
