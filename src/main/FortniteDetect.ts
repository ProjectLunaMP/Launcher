export function FortniteDetect(buildString: string): string {
  if (buildString.includes('3724489')) {
    buildString = '1.8'
  } else if (buildString.includes('3807424')) {
    buildString = '1.11'
  } else if (buildString.includes('3870737')) {
    buildString = '2.4.2'
  } else if (buildString.includes('3741772')) {
    buildString = '1.8.2'
  } else if (buildString.includes('3240987')) {
    buildString = 'Alpha'
  } else {
    if (buildString.includes('-')) {
      const buildAdding = buildString.split('-')

      if (buildAdding.length >= 2) {
        const result = buildAdding.slice(1).join('-')
        // console.log(result);
        //console.log(buildAdding[1])
        ///console.log(buildAdding[2])
        buildString = result
      } else {
        buildString = 'Unknown'
      }
    } else {
      buildString = 'Unknown?'
    }
  }
  return buildString
}
