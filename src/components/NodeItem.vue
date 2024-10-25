<script setup lang="ts">
import type { NodeItem } from '@/types'

const { isEditing, node } = defineProps<{
  isEditing: boolean
  node: NodeItem
}>()

const emit = defineEmits<{
  (event: 'update:localNode', node: NodeItem): void
  (event: 'removeNode', id: string): void
}>()

const localNode = defineModel<NodeItem>('localNode')

const removeNode = (): void => {
  emit('removeNode', node.id)
}
</script>

<template>
  <div class="flex align-items-center">
    <div class="mr-2">
      <span class="select-none" v-if="!isEditing">{{ node.name }}</span>
      <app-input-text
        v-else
        v-model="localNode!.name"
        class="h-2rem"
        :maxlength="50"
      />
    </div>
    <app-button
      v-if="isEditing"
      icon="pi pi-trash"
      iconPos="left"
      severity="secondary"
      class="h-2rem"
      @click="removeNode"
    />
  </div>
</template>

<style scoped></style>
