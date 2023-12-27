<script setup lang="ts">
import { computed } from 'vue'
import { Locales } from '@/enum/Locales.enum'

const props = defineProps({ inputValue: Number })
const emit = defineEmits(['updated'])

const formattedInput = computed(() => {
  return props!.inputValue!.toLocaleString(Locales.EN_US)
})

const handleInput = (event: any) => {
  const value: any = event.target.value
  const onlyNumbers: any = value.replace(/[^0-9]/g, '')
  if (!value || !onlyNumbers) {
    event.target.value = 0
    return
  }
  const updatedValue: number = Number.parseInt(onlyNumbers)
  const formattedValue: string = updatedValue.toLocaleString(Locales.EN_US)
  event.target.value = formattedValue
  emit('updated', updatedValue)
}
</script>

<template>
  <input type="text" :value="formattedInput" @input="handleInput" />
</template>

<style scoped></style>
