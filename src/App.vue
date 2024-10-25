<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import type { Device } from '@/types'
import DeviceItem from '@/components/DeviceItem.vue'
import { deepClone } from '@/utils'

const devices = reactive<Device[]>([])

onMounted(() => {
  const storedDevices = localStorage.getItem('devices')
  if (storedDevices) {
    devices.push(...JSON.parse(storedDevices))
  }
})

const addDevice = (): void => {
  const device: Device = {
    id: crypto.randomUUID(),
    name: 'Новое устройство',
    isNew: true,
    nodes: [],
  }

  devices.unshift(device)
}

const updateDevice = (device: Device): void => {
  const index: number = devices.findIndex(d => d.id === device.id)
  if (index !== -1) {
    devices[index] = deepClone(device)
  }
  localStorage.setItem('devices', JSON.stringify(devices))
}

const removeDevice = (deviceId: string): void => {
  const index: number = devices.findIndex(d => d.id === deviceId)
  if (index !== -1) {
    devices.splice(index, 1)
  }
  localStorage.setItem('devices', JSON.stringify(devices))
}
</script>

<template>
  <main class="container">
    <app-header class="mb-3" />
    <app-button
      class="w-15rem mb-3"
      label="Добавить устройство"
      icon="pi pi-plus"
      iconPos="left"
      @click="addDevice"
    />
    <div class="flex flex-column gap-1">
      <device-item
        v-for="device in devices"
        :key="device.id"
        :device="device"
        @updateDevice="updateDevice"
        @removeDevice="removeDevice"
      />
    </div>
    <app-dialog />
  </main>
</template>

<style scoped>
.container {
  max-width: 1280px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
}
</style>
