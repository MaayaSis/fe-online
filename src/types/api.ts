interface Base {
  id: string,
  name: string
}

export interface Org extends Base {
  children?: Base[]
}

export interface User extends Base {
  checked: Boolean
}

export interface OrgNode {
  parent: OrgNode | null,
  label: string,
  data: Org 
}