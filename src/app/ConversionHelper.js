export function convertToPixel(value) {
  return value.toString() + 'px';
}

export function getPosition(initial, final, toPixel = true) {
  if(initial <= final) {
    return toPixel ? convertToPixel(initial) : initial;
  }
  
  return toPixel ? convertToPixel(final) : final;
}

export function getSize(initial, final, toPixel = true) {
  if(initial <= final) {
    return toPixel ? convertToPixel(final - initial) : final - initial;
  }
  
  return toPixel ? convertToPixel(initial - final) : initial - final;
}