<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { Device } from '@/types'
import { useConfirm } from 'primevue/useconfirm'
import { deepClone } from '@/utils'
import NodeItem from '@/components/NodeItem.vue'

const { device } = defineProps<{ device: Device }>()

const emit = defineEmits<{
  (event: 'updateDevice', device: Device): void
  (event: 'removeDevice', id: string): void
  (event: 'addNode', id: string): void
}>()

const confirm = useConfirm()

const localDevice = reactive<Device>(deepClone(device))
const isEditing = ref<boolean>(false)

onMounted(() => {
  if (localDevice.isNew) {
    toggleEdit()
  }
})

const toggleEdit = (): void => {
  isEditing.value = !isEditing.value
}

const handleEditConfirm = (): void => {
  const updatedDevice = { ...localDevice, isNew: false }
  emit('updateDevice', updatedDevice)
  toggleEdit()
}

const handleCancelEdit = (): void => {
  if (localDevice.isNew) {
    emit('removeDevice', localDevice.id)
  } else {
    Object.assign(localDevice, deepClone(device))
  }
  toggleEdit()
}

const addNode = (): void => {
  localDevice.nodes.push({
    id: crypto.randomUUID(),
    name: 'Новый узел',
  })
}

const confirmRemoveDevice = (): void => {
  confirm.require({
    message: 'Вы действительно хотите удалить устройство?',
    header: 'Подтвердите действие',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Отмена',
    acceptLabel: 'Удалить',
    rejectClass: 'p-button-secondary p-button-text',
    acceptClass: 'p-button-danger',
    accept: () => {
      emit('removeDevice', localDevice.id)
    },
  })
}

const removeNode = (nodeId: string): void => {
  const index: number = localDevice.nodes.findIndex(n => n.id === nodeId)
  if (index !== -1) {
    localDevice.nodes.splice(index, 1)
  }
}

const buttonConfigs = ref([
  {
    icon: 'pi pi-check',
    severity: 'success',
    action: handleEditConfirm,
    showWhenEditing: true,
  },
  {
    icon: 'pi pi-times',
    severity: 'contrast',
    action: handleCancelEdit,
    showWhenEditing: true,
  },
  {
    icon: 'pi pi-pencil',
    severity: 'info',
    action: toggleEdit,
    showWhenEditing: false,
  },
  {
    icon: 'pi pi-trash',
    severity: 'danger',
    action: confirmRemoveDevice,
    showWhenEditing: false,
  },
])
</script>

<template>
  <app-card>
    <template #title>
      <div class="flex justify-content-between align-items-center">
        <div>
          <span class="select-none" v-if="!isEditing">{{ device.name }}</span>
          <app-input-text
            v-else
            v-model="localDevice.name"
            class="h-2rem"
            :maxlength="50"
          />
        </div>
        <div class="flex gap-2">
          <template v-for="(button, index) in buttonConfigs" :key="index">
            <app-button
              v-show="button.showWhenEditing === isEditing"
              :icon="button.icon"
              :severity="button.severity"
              @click="button.action"
            />
          </template>
        </div>
      </div>
    </template>
    <template #content>
      <div class="ml-4">
        <node-item
          v-for="(node, index) in localDevice.nodes"
          :key="node.id"
          v-model:localNode="localDevice.nodes[index]"
          :node="node"
          :is-editing="isEditing"
          class="mb-1"
          @removeNode="removeNode"
        />
        <app-button
          v-if="isEditing"
          class="w-10rem"
          label="Добавить узел"
          icon="pi pi-plus"
          iconPos="left"
          severity="secondary"
          @click="addNode"
        />
      </div>
    </template>
  </app-card>
</template>
