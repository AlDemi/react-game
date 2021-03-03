export const getColors = (num) => {
  switch (num) {
    case 2:
      return '#ff5252'
    case 4:
      return '#4caf50'
    case 8:
      return '#9c27b0'
    case 16:
      return '#673ab7'
    case 32:
      return '#3f51b5'
    case 64:
      return '#2196f3'
    case 128:
      return '#03a9f4'
    case 256:
      return '#00bcd4'
    case 512:
      return '#009688'
    case 1024:
      return '#4caf50'
    case 2048:
      return '#8bc34a'
    default:
      return '#303030'
  }
}
