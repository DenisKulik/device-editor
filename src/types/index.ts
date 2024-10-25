export type Device = {
  id: string
  name: string
  isNew: boolean
  nodes: NodeItem[]
}

export type NodeItem = {
  id: string
  name: string
}
