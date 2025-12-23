interface Pair<T> {
  add: T[]
  remove: T[]
}

//FIXME: what is this supose to do?
export function addRemoveArrays<T>(old: Array<T>, newArray: Array<T>): Pair<T> {
  let remove = new Array<T>()

  if (newArray.length === 0) {
    remove = old
  }

  old.forEach((oldValue) => {
    if (newArray.includes(oldValue)) {
      remove.push(oldValue)
    }
  })

  const add = newArray.filter((nv) => !remove.includes(nv))

  return {
    add,
    remove,
  }
}

export const extractByArray = (obj: any, name: any) => {
  return name.reduce((acc: any, key: any) => {
    return acc && acc[key] !== 'undefined' ? acc[key] : undefined
  }, obj)
}
