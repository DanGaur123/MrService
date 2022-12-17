/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  background:"#F1F5F5",
  white: '#ffffff',
  text: '#282A3A',
  secondaryText:'#D5D9DE',
  primary: '#455898',
  lightprimary :'#BE145230',
  secondary:'#BE1452',
  success: '#28a745',
  error: '#dc3545',
  garargeColor:'#455898',
  doctorColor:'#44B54F',
  homeColor:'#717BFF',
  linkColor:'#F4DF4E',
}

export const NavigationColors = {
  primary: Colors.primary,
}

/**
 * FontSize
 */
export const FontSize = {
  small: 16,
  regular: 20,
  large: 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
