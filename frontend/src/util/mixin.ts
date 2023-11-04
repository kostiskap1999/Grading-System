export function mixin(a: any, b: any): any {
    // Choice: Should isA apply to either mixin? Should it apply to neither?
    const aNotB = Object.defineProperties(Object.create(a.prototype), Object.getOwnPropertyDescriptors(b.prototype));
    const shadowClass: any = function shadowClass(){}
    shadowClass.prototype = aNotB;
    class mixinImpl extends shadowClass {}
    return mixinImpl;
  }