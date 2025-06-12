export function infraTypeToStr(type) {
  var classStr = "";
  var typeStr = "";
  if (type === 0) {
    classStr = "datacenter";
    typeStr = "Datacenter";
  } else if (type === 1) {
    classStr = "ixp";
    typeStr = "Internet Exchange Point (IXP)";
  } else if (type === 2) {
    classStr = "landing";
    typeStr = "Cable Landing Station";
  }
  return [classStr, typeStr];
}
